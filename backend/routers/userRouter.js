import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateToken } from '../utils.js';
import Post from '../models/Post.js';

const userRouter = express.Router();

userRouter.post('/signin', async (req, res) => {
    try {
        //Find the user
        const user = await User.findById(req.body.email);
        if (user) {
            //If the user is found, compare the passwords
            if (bcrypt.compareSync(req.body.password, user.password)) {
                //Create an array that outputs all the of post objects instead of just their IDs
                let outputArray = [];
                for (const element of user.allPosts) {
                    const foundPost = await Post.findById(element);
                    outputArray.push(foundPost);
                }
                //Send the object
                res.send({
                    _id: user._id,
                    username: user.username,
                    allPosts: outputArray,
                    token: generateToken(user)
                });
                return;
            }
        }
    } catch (err) {
        res.send({ message: err });
    }
});

userRouter.post('/', async (req, res) => {
    try {
        //Create a new user with the password given
        const initUser = new User({
            _id: req.body.email,
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10)
        });
        const newUser = await initUser.save();
        //Only send back necessary information and generate the token
        return res.send({
            _id: newUser._id,
            username: newUser.username,
            allPosts: [],
            token: generateToken(newUser)
        });
    } catch (err) {
        res.send({ message: err });
    }
});

userRouter.patch('/', async (req, res) => {
    try {
        //Find the user and update with the given information
        const updatedUser = await User.findByIdAndUpdate(
            req.body.email,
            {
                _id: req.body.email,
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 10)
            },
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        res.send({ message: err });
    }
});

export default userRouter;