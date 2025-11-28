const sendSuccess = (res, statusCode, message, data = {}) => {
    res.status(statusCode).send({
      success: true,
      message,
      data: data
    });
  };
  
  const sendError = (res, statusCode, message, error = null) => {
    console.error(error);
    res.status(statusCode).send({
      success: false,
      message,
      error: error ? error.message : null,
    });
  };
  
  module.exports = {
    sendSuccess,
    sendError,
  };
  