const express=require('express');
const router=express.Router();
const UserController=require('../Controllers/UserController');
const {body}=require('express-validator');  

router.post('/signup',[
    body('userName').isString().isLength({min:4}).notEmpty().withMessage('minimun length of username is 4'),
    body('phoneNumber').notEmpty().withMessage('Phone number is required').isLength({min:10,max:10}).withMessage('Phone number must be 10 digits long'),
],
    UserController.userSignUp
);