import mongoose from "mongoose";

//Post has sender email, the text body, title, whether it is shared, and the timestamp
const PostSchema = new mongoose.Schema({
    senderEmail: {
        type: String,
        required: true
    },
    textBody: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    shared: {
        type: Boolean,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
    /*id auto generated*/
});

const Post = mongoose.model('Post', PostSchema);
export default Post;