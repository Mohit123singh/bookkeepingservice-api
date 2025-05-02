const express=require('express');
const router=express.Router();
const { getBooks,getBook,createBook,updateBook,deleteBook}=require('../controllers/books')
const {protect}=require('../middleware/auth');
const setLocale = require('../middleware/setLocale');
router.route('/').get(protect,setLocale,getBooks).post(protect,setLocale,createBook);
router.route('/:id').get(protect,setLocale,getBook).put(protect,setLocale,updateBook).delete(protect,setLocale,deleteBook);
module.exports=router;