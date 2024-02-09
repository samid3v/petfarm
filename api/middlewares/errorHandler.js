
function errorHandler(err, req, res, next) {
    console.error(err);
  
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
  
    const errorResponse = { error: message };
  
    if (process.env.NODE_ENV === 'development') {
      errorResponse.stack = err.stack;
    }
  
    res.status(statusCode).json(errorResponse);
  }
  
  export default errorHandler;
  