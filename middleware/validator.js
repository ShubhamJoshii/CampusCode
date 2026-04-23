const validator = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    if (err.issues) {
      return res.status(400).json({
        errors: err.issues.map((e) => ({
          field: e.path[0],
          message: e.message,
        })),
      });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = validator;