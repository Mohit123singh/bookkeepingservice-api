const express=require('express');
const router=express.Router();

const{borrowBook,returnBook}=require('../controllers/borrowing');
const {protect}=require('../middleware/auth')
const setLocale = require('../middleware/setLocale');

router.route('/borrow').post(protect,setLocale,borrowBook);
router.route('/return/:id').put(protect,setLocale,returnBook);

module.exports=router;