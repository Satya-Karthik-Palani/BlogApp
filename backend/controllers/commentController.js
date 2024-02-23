const Comment = require("../models/commentModel");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Post = require("../models/postModel");

exports.createComment = catchAsyncErrors(async(req,res,next)=>{
    const comment = await Comment.create({...req.body,user_name:req.user.name});
    res.status(200).json({
        success: true,
        comment
    })
})

exports.getPostComments = catchAsyncErrors(async(req,res)=>{
    let post =await Post.findById(req.params.id)
    if(!post){
        return next(new ErrorHandler("Page not found",404));
    }
    const comments = await Comment.find({post:post}).sort({ createdAt: -1 });
    res.status(200).json({
        success:true,
        comments
    });
})