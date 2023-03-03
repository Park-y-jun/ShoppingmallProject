const tryCatch = (controller) => (req, res, next) => {
  controller(req, res, next).catch((e) => next(e));
};

module.exports = tryCatch;
