const express=require('express');
const router=express.Router();

const{protect,authorize}=require('../middleware/auth')
const setLocale = require('../middleware/setLocale');
const {getLibraries,getLibrary,addLibrary,updateLibrary,deleteLibrary}=require('../controllers/libraries')
router.route('/').get(protect,setLocale,getLibraries).post(protect,setLocale,authorize('admin','owner'),addLibrary)
router.route('/:id').get(protect,setLocale,authorize('admin','owner'),getLibrary).put(protect,setLocale,authorize('admin','owner'),updateLibrary).delete(protect,setLocale,authorize('admin','owner'),deleteLibrary);

module.exports=router