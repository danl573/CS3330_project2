const jwt = require("jsonwebtoken");

const accessTokenSecret = 'kachow';

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};

const authenticateWithClaims = (claims) => (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, accessTokenSecret, (err, employee) => {
    if (err) {
      return res.sendStatus(403);
    }
    for (let claim of claims) {
      if (employee.claims.includes(claim)) {
        req.employee = employee;
        return next();
      }
    }
    return res.sendStatus(403);
  });
}

module.exports = { authenticateJWT, authenticateWithClaims };