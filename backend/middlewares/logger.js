// This is a simple custom middleware function.
// It intercepts every incoming request before it reaches your route handlers.
const requestLogger = (req, res, next) => {
  const currentDateTime = new Date().toISOString();
  console.log(`[${currentDateTime}] ${req.method} request made to: ${req.url}`);
  
  // The next() function is crucial. It tells Express to move on to the next middleware or route handler.
  // If you forget next(), the request will just hang and the client will never get a response!
  next();
};

module.exports = requestLogger;
