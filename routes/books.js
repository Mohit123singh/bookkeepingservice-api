const express=require('express');
const router=express.Router();
const { getBooks,getBook,createBook,updateBook,deleteBook}=require('../controllers/books')
const {protect}=require('../middleware/auth');
router.route('/').get(getBooks).post(protect,createBook);
router.route('/:id').get(getBook).put(protect,updateBook).delete(protect,deleteBook);
module.exports=router;