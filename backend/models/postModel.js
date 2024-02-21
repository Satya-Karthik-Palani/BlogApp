const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please enter title of the post"]
    },
    description:{
        type:String,
        required:[true,"Please enter post description"]
    },
    imageurl: {
        type:String,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Post",postSchema);