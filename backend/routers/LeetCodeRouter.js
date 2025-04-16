const express=require('express');
const router=express.Router();
const LeetCodeController=require('../Controllers/LeetCodeController');



router.get('/contest',LeetCodeController.getLeetCodeContest);
router.get('/solution',LeetCodeController.getLeetCodeSolution);


module.exports=router;