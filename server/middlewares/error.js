export const globalErrorHandler=(err,req,res,next)=>{
   
    err.message=err.message || "Something went wrong! Please try again after some time"
    err.statusCode=err.statusCode|| 500;

    return res.status(err.statusCode).json({
        error:{
            success:false,
            message:err.message,
        }
    })
}