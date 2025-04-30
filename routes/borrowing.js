const express=require('express');
const router=express.Router();

const{borrowBook,returnBook}=require('../controllers/borrowing');
const {protect}=require('../middleware/auth')

router.route('/borrow').post(protect,borrowBook);
router.route('/return/:id').put(protect,returnBook);

module.exports=router;