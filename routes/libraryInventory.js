const express=require('express');
const router=express.Router();
const {protect}=require('../middleware/auth');
const {getBooks,addBook,deleteBook}=require('../controllers/libraryInventory')

router.route('/libraries/:id/inventory').get(getBooks).post(protect,addBook);
router.route('/libraries/:id/inventory/:bookId').delete(protect,deleteBook);

module.exports=router;