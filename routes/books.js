const express=require('express');
const router=express.Router();
const { getBooks,getBook,createBook,updateBook,deleteBook,bookPhotoUpload}=require('../controllers/books')
const {protect,authorize}=require('../middleware/auth');
const setLocale = require('../middleware/setLocale');
const upload=require('../middleware/upload')
router.route('/').get(protect,setLocale,getBooks).post(protect,setLocale,authorize('author','admin'),createBook);
router.route('/:id').get(protect,setLocale,getBook).put(protect,setLocale,authorize('author','admin'),updateBook).delete(protect,setLocale,authorize('author','admin'),deleteBook);
router.route('/:id/photo').put(protect,setLocale,upload,bookPhotoUpload);
module.exports=router;