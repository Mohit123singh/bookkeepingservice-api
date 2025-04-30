const asyncHandler=require('express-async-handler')
const ErrorResponse=require('../utils/errorResponse')
const Library=require('../models/Library')


// @desc   Get all libraries
// @route  GET /api/v1/libraries
// @access Public
const getLibraries=asyncHandler(async(req,res,next)=>{

    const libraries=await Library.find();

    if(libraries.length===0)
    {
        return next(new ErrorResponse('No library found', 404));
    }

    

    res.status(200).json({
        success:true,
        count:libraries.length,
        data:libraries,
    })

})


// @desc   Get Single library
// @route  GET /api/v1/libraries/:id
// @access Public
const getLibrary=asyncHandler(async(req,res,next)=>{

    const library=await Library.findById(req.params.id).populate({
        path:'books',
        select:'title description borrower',
        populate: {
            path: 'borrower',
            select: 'name email',
          },
    })

    if(!library)
        return next(new ErrorResponse(`No Library with the id of ${req.params.id}`,404))
   
    res.status(200).json({
        success:true,
        data:library,
    })

})



// @desc   Create new library
// @route  POST /api/v1/library
// @access Private

const addLibrary=asyncHandler(async(req,res,next)=>{

      // add user to req.body
      req.body.user=req.user.id;

    const library=await Library.create(req.body);

        res.status(201).json({
            success:true,
            data:library
        })
})


// @desc   Update library
// @route  PUT /api/v1/library/:id
// @access Private
const updateLibrary=asyncHandler(async(req,res,next)=>{

    let library = await Library.findById(req.params.id);

    if (!library) {
      return next(
        new ErrorResponse(`Library not found with id: ${req.params.id}`, 404)
      );
    }

    library = await Library.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
    
      res.status(200).json({
        success: true,
        data: library,
      });
   
})

// @desc   Delete Library
// @route  DELETE /api/v1/Library/:id
// @access Private
const deleteLibrary=asyncHandler(async(req,res,next)=>{
   
   
    const library = await Library.findById(req.params.id);

    if (!library) {
      return next(
        new ErrorResponse(`Library not found with id: ${req.params.id}`, 404)
      );
    }

     await library.deleteOne();
    
      res.status(200).json({
        success: true,
        data: {},
      });
   
});


module.exports={
    getLibraries,
    getLibrary,
    addLibrary,
    updateLibrary,
    deleteLibrary,
}