
/**
 * @errorMiddleware - Global error handling middleware.
 * Catches any errors thrown in the application and formats the response with appropriate status and message.
 * It also returns the stack trace for development purposes (can be removed in production).
 */
// const errorMiddleware=(err, req, res, next)=>{
//     err.statusCode= err.statusCode||500;
//     err.massge= err.massge||"Something went wrong",
//     res.status(err.statusCode).json({
//         success:false,
//         message:err.massge,
//         stack:err.stack,        

//     })
// }
// export default errorMiddleware;
const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Something went wrong";
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  };
  
  export default errorMiddleware;

// const errorMiddleware = (err, req, res, next) => {

//     err.statusCode = err.statusCode || 500;
//     err.message = err.message || "Something went wrong";


//     return res.status(400).json({
//         success: false,
//         message : err.message,
//         stack: err.stack
//     })
// }

// export default errorMiddleware;