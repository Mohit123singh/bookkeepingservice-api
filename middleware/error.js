const ErrorResponse=require('../utils/errorResponse')
const errorHandler=(err,req,res,next)=>{

    let error={...err};
    error.message=err.message;

    // Set the locale from request
     const __ = req.__.bind(req); // i18n translator
    //const __ = typeof req.__ === 'function' ? req.__.bind(req) : (key) => key;
 

   //Log to the console for dev
   console.log(err);

   //Mongoose bad ObjectId
   if(err.name==='CastError')
   {
    const message = __('errors.not_found');
        error=new ErrorResponse(message,404);
        
   }

   // Mongoose duplicate Key

   if(err.code===11000)
   {
    const message = __('errors.duplicate_field');
     error=new ErrorResponse(message,400);
   }

   // Mongoose Validation error 
   if(err.name==='ValidationError')
   {
     const message=Object.values(err.errors).map(val=>val.message)
     error=new ErrorResponse(message,400)
   }

   res.status(error.statusCode || 500).json({
    success:false,
    error:  error.message ||__('errors.server_error'),
   })
}
module.exports=errorHandler;