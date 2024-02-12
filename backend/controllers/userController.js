const express =  require("express");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
        const {username,email,password} = req.body;

        const user = await User.create({
            name:username,
            email,
            password,
            avatar:{
                public_id:"This is a sample id",
                url:"Samplepicurl",
            },
        })

        sendToken(user,200,res);
    }
)

exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email}).select("+password");

    if(!user || !password){
        return next(new ErrorHandler("Please enter user & password",400));
    }

    if(!user){
        return next(new ErrorHandler("Invalid user or password",400))
    }
    const isPasswordMatched = await user.comparePassword(password);
    
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid user or password",400))
    }

    sendToken(user,200,res);

})

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});