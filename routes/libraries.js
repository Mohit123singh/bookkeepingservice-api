const express=require('express');
const router=express.Router();

const{protect}=require('../middleware/auth')
const setLocale = require('../middleware/setLocale');
const {getLibraries,getLibrary,addLibrary,updateLibrary,deleteLibrary}=require('../controllers/libraries')
router.route('/').get(protect,setLocale,getLibraries).post(protect,setLocale,addLibrary)
router.route('/:id').get(protect,setLocale,getLibrary).put(protect,setLocale,updateLibrary).delete(protect,setLocale,deleteLibrary);

module.exports=router