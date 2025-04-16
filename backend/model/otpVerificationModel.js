const mongoose=require('mongoose');

const OptVerificationSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    optExpiry:{
        type:Date,
        default:Date.now(),
        expires:300
    },
});

module.exports=mongoose.model("OptVerification",OptVerificationSchema);