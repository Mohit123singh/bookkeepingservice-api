const express=require('express');
const router=express.Router();
const {protect}=require('../middleware/auth');
const setLocale = require('../middleware/setLocale');
const {getBooks,addBook,deleteBook}=require('../controllers/libraryInventory')

router.route('/libraries/:id/inventory').get(protect,setLocale,getBooks).post(protect,setLocale,addBook);
router.route('/libraries/:id/inventory/:bookId').delete(protect,setLocale,deleteBook);

module.exports=router;