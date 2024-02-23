const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    description:{
        type:String,
        required:[true,"Please enter comment description"]
    },
    post: {
        type: mongoose.Schema.ObjectId,
        ref: "Post",
        required: true,
    },
    user_name: {
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Comment",commentSchema);