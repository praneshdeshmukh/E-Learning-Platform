import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import asyncHandler from "./asyncHandler.middleware.js";
import User from "../models/user.model.js";

export const isLoggedIn = asyncHandler(async (req, _res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError("Unauthorized, please login to continue", 401));
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    return next(new AppError("Unauthorized, please login to continue", 401));
  }

  req.user = decoded;
  next();
});

// Rest of the file remains the same

// Middleware to check if user is admin or not
export const authorizeRoles = (...roles) =>
  asyncHandler(async (req, _res, next) => {
    console.log(req.user.role);
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to view this route", 403)
      );
    }

    next();
  });

// Middleware to check if user has an active subscription or not
export const authorizeSubscribers = asyncHandler(async (req, _res, next) => {
  // If user is not admin or does not have an active subscription then error else pass
  const user=await User.findById(req.user.id);
  if (user.role !== "ADMIN" && user.subscription.status !== "active") {
    return next(new AppError("Please subscribe to access this route.", 403));
  }

  next();
});


// import AppError from "../utils/AppError.js";
// import jwt from 'jsonwebtoken';

// const isLoggedIn = async (req, res, next) => {
//     const { token } = req.cookies;

//     if (!token) {
//         return next(new AppError('Unauthenticated, please login again', 401));
//     }

//     const userDetails = await jwt.verify(token, process.env.JWT_SECRET);

//     req.user = userDetails; // all user related details enlisted in generatejwttoken
//     // func in user.model.js were stored in an object,
//     // now this obj is getting stored in req.user  -> req.user

//     next();
// }

// const authorizeRoles = (...roles) => async (req, res, next) => {
//     // JWT.sign( // all user info gets stored in an object
//     // {id: this._id, email: this.email, courseSubscribed: this.courseSubscribed, role: this.role},
//     // process.env.JWT_SECRET,
//     const currentUserRole = req.user.role;
//     if (!roles.includes(currentUserRole)) {
//         return next(
//             new AppError('You do not have permission to access this route', 403)
//         )
//     }
//     next();
// }

// const authorizeSubscribers = async(req, res, next) => {
//     const subsciption = req.user.subsciption;
//     const currentUserRole = req.user.role;
//     if (currentUserRole !== 'ADMIN' && subsciption.status !== 'active') {
//         return next(
//             new AppError('Please subscribce to access this route!', 403)
//         )
//     }

//     next();
// }

// export {
//     isLoggedIn,
//     authorizeRoles,
//     authorizeSubscribers
// }