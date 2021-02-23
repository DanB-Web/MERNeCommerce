import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler (async (req, res, next) => {
  
  let token;

  if (req.headers.authorization && 
      req.headers.authorization.startsWith('Bearer')) {

      try {

        //Get token from http auth header and decode info inside jwt token
        token = req.headers.authorization.split(' ')[1]; //Remove 'Bearer' from auth header
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  //Check with jwt
   
        //Access database with decoded id and populate req.user object WITHOUT PASSWORD
        req.user = await User.findById(decoded.id).select('-password'); 

        //Call next middleware
        next();

      } catch (err) {
        console.log(err);
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

});

export { protect }