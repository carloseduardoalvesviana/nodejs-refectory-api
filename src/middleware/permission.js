async function checkPermission(req, res, next) {
  console.log(req.method);
  next();
}

module.exports = {
  checkPermission,
};
