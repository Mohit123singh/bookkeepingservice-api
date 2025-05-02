const asyncHandler=require('express-async-handler')
const ErrorResponse=require('../utils/errorResponse')
const Library=require('../models/Library')
const Book=require('../models/Book')


// @desc   Get books from specific library
// @route  GET /api/v1/libraries/:id/inventory
// @access Public


const getBooks=asyncHandler(async(req,res,next)=>{

  const __ = req.__.bind(req);
    const library = await Library.findById(req.params.id);
 
    if (!library) {
      return next(new ErrorResponse(__('inventory.library_not_found', { id: req.params.id }), 404));
    }
      const books=await Book.find({library:req.params.id})
      return res.status(200).json({
        success:true,
        count:books.length,
        data:books,
      })
})


// @desc   Add Book to specific library
// @route  POST /api/v1/libraries/:id/inventory
// @access Private


const addBook=asyncHandler(async(req,res,next)=>{

   
     // add user to req.body
   //  req.body.user=req.user.id;

   const __ = req.__.bind(req);
    const library=await Library.findById(req.params.id);

    if (!library) {
      return next(new ErrorResponse(__('inventory.library_not_found', { id: req.params.id }), 404));
    }
   
    req.body.library=req.params.id;

    const book=await Book.create(req.body)

    res.status(200).json({
        success:true,
        message: __('inventory.book_added'),
        data:book
    })
    

})


// @desc   Delete Book from specific library
// @route  delete /api/v1/libraries/:id/inventory/:bookId
// @access Private

const deleteBook=asyncHandler(async(req,res,next)=>{

  const __ = req.__.bind(req);

    const { id: libraryId, bookId } = req.params;

    const library = await Library.findById(libraryId);
   if (!library) {
    return next(new ErrorResponse(__('inventory.library_not_found', { id: libraryId }), 404));
  }
  
    const book = await Book.findOne({ _id: bookId, library: libraryId });
    if (!book) {
      return next(new ErrorResponse(__('inventory.book_not_found', { bookId }), 404));
    }
  

    await book.deleteOne();
  
        

    res.status(200).json({
        success:true,
        message: __('inventory.book_deleted'),
        data:{},
    })
})


module.exports={
    getBooks,
    addBook,
    deleteBook

}
