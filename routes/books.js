const express=require('express');
const router=express.Router();
const { getBooks,getBook,createBook,updateBook,deleteBook,bookPhotoUpload}=require('../controllers/books')
const {protect}=require('../middleware/auth');
const setLocale = require('../middleware/setLocale');
const upload=require('../middleware/upload')
router.route('/').get(protect,setLocale,getBooks).post(protect,setLocale,createBook);
router.route('/:id').get(protect,setLocale,getBook).put(protect,setLocale,updateBook).delete(protect,setLocale,deleteBook);
router.route('/:id/photo').put(protect,setLocale,upload,bookPhotoUpload);
module.exports=router;