const Post = require("../models/postModel");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");

exports.getAllPosts = catchAsyncErrors(async(req,res)=>{
    const postscount = await Post.countDocuments();
    const posts = await Post.find();
    res.status(200).json({success:true,posts,postscount});
})

exports.createPost = catchAsyncErrors(async(req,res,next)=>{
    const post = await Post.create({...req.body,user:req.user});
    res.status(200).json({
        success:true,
        post
    })
})

exports.updatePost = catchAsyncErrors(async(req,res,next)=>{
    let post =await Post.findById(req.params.id)
    if(!post){
        return next(new ErrorHandler("Page not found",404));
    }
    post = await Post.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators:true,
        useFindAndModify: false
    })
    res.status(200).json({
        success:true,
        post
    })
})

exports.deletePost = catchAsyncErrors(async(req,res)=>{
    const post = await Post.findById(req.params.id);
    if(!post){
        return next(new ErrorHandler("Page not found",404));    
    }
    await Post.deleteOne(post);
    res.status(200).json({
        success: true,
        message:"Post deleted successfully"
    })
})

exports.getMyPosts = catchAsyncErrors(async(req,res)=>{
    const posts = await Post.find({user:req.user});
    const postscount = await Post.find({user:req.user}).countDocuments();
    res.status(200).json({success:true,posts,postscount});
})