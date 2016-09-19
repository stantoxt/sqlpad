module.exports = function mustBeAdmin (req, res, next) {
  if (req.user.role === 'admin') {
    next()
  } else {
    next(new Error('You must be an admin to do that'))
  }
}
