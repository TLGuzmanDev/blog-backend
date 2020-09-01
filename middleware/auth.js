const jwt = require('jsonwebtoken');

const getToken = (req) => {
  const authHeader = req.get('authorization');
  if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
    return authHeader.substring(7);
  }
  return null;
};

const verify_token = (req, res, next) => {
  const token = getToken(req);
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (!decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
      }
      req.decodedToken = decodedToken;
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ error: 'Failed to authenticate token on API server.' });
    }
  } else {
    return res.status(401).send({ error: 'token missing or invalid' });
  }
};

module.exports = verify_token;
