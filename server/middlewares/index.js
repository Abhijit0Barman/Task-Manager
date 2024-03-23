const fs = require("fs");

function logReqRes(filename) {
  return (req, res, next) => {
    fs.appendFile(
      // "./log.txt",
      filename,
      `IP-${req.ip} TIME-${new Date().toISOString()} METHOD-${
        req.method
      } PATH-${req.url}\n`,
      (err, data) => {}
    );
    next();
  };
}

module.exports = {
  logReqRes,
};
