const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../models/blacklist.model");
require("dotenv").config();

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    const blackToken = await BlacklistModel.findOne({ token });
    if (blackToken) {
      return res.status(201).send({
        msg: "You have been logged out, Please login again! 💀",
      });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (decoded) {
        // console.log(decoded);
        req.body.userID = decoded.userID;
        req.body.username = decoded.username;
        next();
      } else {
        res.send({ msg: "You  are not authorized to view this data!" });
      }
    });
  } else {
    res.send({ msg: "You  are not Login!" });
  }
};

module.exports = {
  auth,
};
