const {validationResult}=require('express-validator');
const OtpVerification=require('../model/otpVerificationModel');

const generateOTP=()=>{
    return Math.floor(1000+Math.random()*9000).toString();
}

exports.userSignUp=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors:errors.array()});
    }
    const {userName,phoneNumber}=req.body;
    const otp=generateOTP();
    const user=await OtpVerification.create({
        userName,
        phoneNumber,
        otp
    });
    console.log("OTP generated successfully",user);
    res.status(200).json({
        message:"OTP sent successfully",
        user:{user}
    });
}