const asyncHandler=require('express-async-handler')
const ErrorResponse=require('../utils/errorResponse')
const Book=require('../models/Book');



// @desc   Borrow a book
// @route  POST /api/v1/borrow
// @access Private


const borrowBook=asyncHandler(async(req,res,next)=>{

    const {title, charge } = req.body;

  if (!title || !charge) {
    return next(new ErrorResponse('Please add bookId and charge', 400));
  }

  const book = await Book.findOne({title});

  if (!book) {
    return next(new ErrorResponse('Book not found', 404));
  }

  // Check if the book is already borrowed
  if (book.borrower) {
    return next(new ErrorResponse('Book is already borrowed', 400));
  }

  // Calculate required charge (half of cost)
  const requiredCharge = Math.ceil(book.cost / 2);

  if (charge < requiredCharge) {
    return next(new ErrorResponse(`Insufficient amount. Required: ${requiredCharge}`, 400));
  }

  // Borrow the book
  book.borrower = req.user.id;
  book.borrowedAt = Date.now();

  await book.save();

  res.status(200).json({
    success: true,
    data: book,
  });
})



// @desc   Return a borrowed book
// @route  PUT /api/v1/return/:id
// @access Private


const returnBook=asyncHandler(async(req,res,next)=>{


  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(new ErrorResponse('Book not found', 404));
  }

  // Check if current user is the one who borrowed it
  if (!book.borrower || book.borrower.toString() !== req.user.id) {
    return next(new ErrorResponse('You have not borrowed this book', 403));
  }

  // Reset borrower and borrowedAt
  book.borrower = null;
  book.borrowedAt = null;

  await book.save();

  res.status(200).json({
    success: true,
    data: book,
  });
})




module.exports={
    borrowBook,
    returnBook,
}
