
export function isAdmin(req, res, next) {
    if (req.user && req.user.role === 'superadmin') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
}