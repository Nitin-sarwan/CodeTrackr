const express=require('express');
const router=express.Router();
const CodeChefController=require('../Controllers/CodeChefController');


router.get('/contest',CodeChefController.getCodeChefContest);
router.get('/solution',CodeChefController.getCodeChefSolution);



module.exports=router;