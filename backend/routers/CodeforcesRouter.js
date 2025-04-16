const express=require('express');
const router=express.Router();
const CodeforcesController=require('../Controllers/CodeforcesController');

router.get('/contest',CodeforcesController.getCodeforcesContest);
router.get('/solution',CodeforcesController.getCodeforcesSolution);

module.exports=router;