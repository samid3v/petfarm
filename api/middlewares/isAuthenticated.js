import jwt from 'jsonwebtoken';

export const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;

    console.log(token);
  
    if (!token) {
          const error = new Error("Access denied: No token provided");
          error.statusCode = 401;
          throw error;
          return
    }
  
    jwt.verify(token, process.env.API_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized access', err });
      }
      req.user = decoded;
      next();
    });
  };