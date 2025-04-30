const express=require('express');
const router=express.Router();

const{protect}=require('../middleware/auth')
const {getLibraries,getLibrary,addLibrary,updateLibrary,deleteLibrary}=require('../controllers/libraries')
router.route('/').get(getLibraries).post(protect,addLibrary)
router.route('/:id').get(getLibrary).put(protect,updateLibrary).delete(protect,deleteLibrary);

module.exports=router