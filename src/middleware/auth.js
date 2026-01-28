const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "Tidak Diizinkan",
    });
  }

  next();
};

module.exports = auth;
