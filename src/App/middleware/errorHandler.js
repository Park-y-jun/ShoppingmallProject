const errorHandler = (error, req, res, next) => {
  return res.status(400).json({ success: false, msg: error.message });
};

module.exports = errorHandler;
