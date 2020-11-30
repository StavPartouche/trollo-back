const logger = require('../services/logger.service')

async function requireAuth(req, res, next) {
  const board = req.body;
  if (req.session && req.session.user && req.session.user !== board.creator ) {
    res.status(401).end('Unauthorized!');
    return;
  }
  next();
}

module.exports = {
  requireAuth,
}
