const notFound=(req,res,next)=>{
    const __ = req.__.bind(req); 
    const error = new Error(__('errors.not_found'));
    error.status = 404;
    next(error);
}

module.exports=notFound;