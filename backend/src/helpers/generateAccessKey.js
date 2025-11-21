const crypto = require("crypto");

exports.generateAccessKey = () => {
  return crypto.randomBytes(16).toString("hex");
};
