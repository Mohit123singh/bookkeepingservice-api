const jwt=require('jsonwebtoken');
const asyncHandler=require('express-async-handler')
const ErrorResponse=require('../utils/errorResponse')
const User=require('../models/User')

// Protect Routes

const protect=asyncHandler(async(req,res,next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        // set token from Bearer token in header.
        token=req.headers.authorization.split(' ')[1];
    }
    //set token from cookie
    // else if(req.cookies.token)
    // {
    //     token=req.cookies.token;
    // }

    // Make sure token exists
    if(!token)
    {
        return next(new ErrorResponse('Not authorized to access this route',401));
    }

    try{
        //verify token
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        req.user=await User.findById(decoded.id);
        next();


    }catch(err)
    {
        return next(new ErrorResponse('Not authorized to access this route',401));
    }

    

})

module.exports={
    protect,
}