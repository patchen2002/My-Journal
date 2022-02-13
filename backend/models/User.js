import mongoose from "mongoose";

//Each user has an _id(email), username, password, and an array with their postIDs
const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    allPosts: {
        type: [String],
        default: []
    }
});

const User = mongoose.model('User', UserSchema);
export default User;