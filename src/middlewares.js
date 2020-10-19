function notFound(req, res, next) {
  const error = new Error(`Not found - ${req.originialUrl}`);
  res.status(404);
  next(error);
}

function errorHandler(error, req, res, next) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  res.json({
    status: statusCode,
    message: error.message,
    stack:
      process.env.NODE_ENV === "production"
        ? "Oh boy! it must be that bad"
        : error.stack,
  });
}

module.exports = {
  notFound,
  errorHandler,
};
