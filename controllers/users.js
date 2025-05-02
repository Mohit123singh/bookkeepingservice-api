const asyncHandler=require('express-async-handler')
const ErrorResponse=require('../utils/errorResponse')
const User=require('../models/User')


// @desc   Register user
// @route  POST /api/v1/users/register
// @access Public
const register=asyncHandler(async(req,res,next)=>{
  
 
    const {name,email,password,role,lang}=req.body;
    req.setLocale(lang || 'en');
    const __ = req.__.bind(req);

  

    // Create user
    const user=await User.create({
        name,
        email,
        password,
        role,
        lang :lang || 'en'
    })

    sendTokenResponse(user, 200, res, __('auth.register_success'));
})




// @desc   Login user
// @route  POST /api/v1/users/login
// @access Public
const login=asyncHandler(async(req,res,next)=>{
  const { email, password ,lang} = req.body;

  req.setLocale(lang || 'en');
  const __ = req.__.bind(req);

   // Validate email & password

   if (!email || !password) {
    return next(new ErrorResponse(__('auth.missing_credentials'), 400));
  }

   // Check for user
   const user=await User.findOne({email}).select('+password');

   if (!user) {
    return next(new ErrorResponse(__('auth.invalid_credentials'), 401));
  }

   // Check if password matches
   const isMatch=await user.matchPassword(password);

   if (!isMatch) {
    return next(new ErrorResponse(__('auth.invalid_credentials'), 401));
  }
    
  sendTokenResponse(user, 200, res, __('auth.login_success'));
})




// Get token from model, create cookie and send response

const sendTokenResponse=(user,statusCode,res,message)=>{

    // create token
    const token=user.getSignedJwtToken()

    // Cookie options
  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true, // Cookie not accessible via JS
  };

  // For production - secure cookie over HTTPS only
  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  // Send cookie
  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      message,
      token,
    });
}

module.exports={
    register,
    login,
}
