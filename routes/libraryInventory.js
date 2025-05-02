const express=require('express');
const router=express.Router();
const {protect,authorize}=require('../middleware/auth');
const setLocale = require('../middleware/setLocale');
const {getBooks,addBook,deleteBook}=require('../controllers/libraryInventory')

router.route('/libraries/:id/inventory').get(protect,setLocale,authorize('admin','owner'),getBooks).post(protect,setLocale,authorize('admin','owner'),addBook);
router.route('/libraries/:id/inventory/:bookId').delete(protect,setLocale,authorize('admin','owner'),deleteBook);

module.exports=router;