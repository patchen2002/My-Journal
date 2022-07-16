import express from 'express';
import Post from '../models/Post.js';
import User from '../models/User.js';

const postRouter = express.Router();

//Find the post with the ID given
postRouter.post('/get', async (req, res) => {
    try {
        const post = await Post.findById(req.body.id);
        res.send(post);
    } catch (err) {
        res.send({ message: err });
    }
});

//Find all user posts
postRouter.post('/user', async (req, res) => {
    try {
        const user = await User.findById(req.body.email);
        let outputArray = [];
        for (const element of user.allPosts) {
            const foundPost = await Post.findById(element);
            outputArray.push(foundPost);
        }
        res.send(outputArray);
    } catch (err) {
        res.send({ message: err });
    }
});

postRouter.post('/', async (req, res) => {
    try {
        //Create a new post, and save it
        const initPost = new Post(req.body);
        const newPost = await initPost.save();
        //Find the corresponding user who posted it
        const user = await User.findById(newPost.senderEmail);

        //Update the users allPosts array
        const holderArray = [newPost._id];
        const finalArray = user.allPosts.concat(holderArray);
        const newUser = await User.findByIdAndUpdate(
            newPost.senderEmail,
            { allPosts: finalArray },
            { new: true }
        );
        if (newPost.shared) {
            const sharedUser = await User.findById("shared-posts@example.com");
            const sharedHolderArray = [newPost._id];
            const sharedFinalArray = sharedUser.allPosts.concat(sharedHolderArray);
            const newUser = await User.findByIdAndUpdate(
                "shared-posts@example.com",
                { allPosts: sharedFinalArray },
                { new: true }
            );
        }
        return res.json(newPost);
    } catch (err) {
        res.send({ message: err });
    }
});

postRouter.patch('/:id', async (req, res) => {
    try {
        //Find and update the post
        const post = await Post.findById(req.params.id);
        if (post.shared !== req.body.shared) {
            if (req.body.shared == "true") {
                const sharedUser = await User.findById("shared-posts@example.com");
                if (sharedUser.allPosts.indexOf(post._id) === -1) {
                    const sharedHolderArray = [post._id];
                    const sharedFinalArray = sharedUser.allPosts.concat(sharedHolderArray);
                    const newUser = await User.findByIdAndUpdate(
                        "shared-posts@example.com",
                        { allPosts: sharedFinalArray },
                        { new: true }
                    );
                }
            } else {
                const sharedUser = await User.findById("shared-posts@example.com");
                const index = sharedUser.allPosts.indexOf(post._id);
                sharedUser.allPosts.splice(index, 1);
                sharedUser.allPosts = sharedUser.allPosts.filter(x => x !== null);
                sharedUser.save();
            }
            post.shared = req.body.shared;
        }
        if (post) {
            post.title = req.body.title || post.title;
            post.textBody = req.body.textBody || post.textBody;
        }
        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (err) {
        res.send({ message: err });
    }
});

postRouter.delete('/:id', async (req, res) => {
    try {
        //Finding the desired deleted post
        const deletedPost = await Post.findById(req.params.id);
        //Finding the original poster and the shared poster
        const sharedUser = await User.findById("shared-posts@example.com");
        const user = await User.findById(deletedPost.senderEmail);
        //Deleting the post from sharedUser.allPosts
        if (deletedPost.shared) {
            const index = sharedUser.allPosts.indexOf(deletedPost._id);
            sharedUser.allPosts.splice(index, 1);
            sharedUser.allPosts = sharedUser.allPosts.filter(x => x !== null);
            sharedUser.save();
        }
        //Deleting the post from user.allPosts
        const index = user.allPosts.indexOf(deletedPost._id);
        user.allPosts.splice(index, 1);
        user.allPosts = user.allPosts.filter(x => x !== null);
        user.save();
        //Delete
        const numDeleted = await Post.deleteOne({ _id: req.params.id });
        return res.send(numDeleted);
    } catch (err) {
        res.send({ message: err });
    }
});

export default postRouter;