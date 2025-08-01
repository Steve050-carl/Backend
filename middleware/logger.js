const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} - ${req.originalUrl}`);
  next();
};

export default logger;
