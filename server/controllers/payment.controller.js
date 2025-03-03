import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";
import { razorpay } from "../server.js";
import AppError from "../utils/AppError.js";
import crypto from "crypto"



const getRazorpayApiKey = async (req,res,next) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Razorpay API KEY',
            key: process.env.RAZORPAY_KEY_ID
        });
        
    } catch (e) {
        return next(
            new AppError(e.message,500)
        );
    }
};


const buySubscription = async (req,res,next) => {

    try {

        const { id } = req.user;
        const validUser = await User.findById(id);
    
        if(!validUser) {
            return next(
                new AppError('Unauthorized user,please try again',400)
            )
        };
    
    
        if(validUser.role === "ADMIN") {
            return next(
                new AppError('Admin cannot subscribe to any courses',500)
            );
        };
        const subscription = await razorpay.subscriptions.create({
            plan_id: process.env.RAZORPAY_PLAN_ID,
            customer_notify: 1 // notification communication handled by Razorpay
        })
    
        validUser.subscription.id = subscription.id;
        validUser.subscription.status = subscription.status;
    
        await validUser.save(); //token saved
        res.status(200).json({
            success:true,
            message: 'Subscribed Successfully',
            subscription_id: subscription.id,
        });
        
    } catch (e) {
        return next(
            new AppError(e.message,500)
        );
    };
};


// const verifySubscription = async (req,res,next) => {

//     try {

//         const { id } = req.user;
//         const {
//             razorpay_payment_id,
//             razorpay_signature,
//             razorpay_subscription_id,
//         } = req.body;
    
    
//         const subscribedUser = await User.findById(id);
    
//         if(!subscribedUser) {
//             return next(
//                 new AppError('Unauthorized request, please login again',500)
//             );
//         };
    
//         const subscription_id = subscribedUser.subscription.id;
    
//         const generateSignature = crypto    
//                 .createHmac("sha256", process.env.RAZORPAY_SECRET)
//                 .update(`${razorpay_payment_id}|${subscription_id}`)
//                 .digest('hex');
    
//             if(generateSignature !== razorpay_signature) {
//                 return next(
//                     new AppError("Payment not verified, please try again",500)
//                 );
//             };
    
//             await Payment.create({
//                 razorpay_payment_id,
//                 razorpay_signature,
//                 razorpay_subscription_id
//             });
    
//             subscribedUser.subscription.status = "active";
//             await subscribedUser.save();
    
//             res.status(200).json({
//                 success: true,
//                 message: "Payment verified successfully!",
//               });


//     } catch (error) {
//         return next(new AppError(e.message, 500));
//     }
        
// };
// const cancelSubscription = async (req,res,next) => {

//     try {
//         const { id } = req.user;
    
//         const user = await User.findById(id);
    
//         if (!user) {
//           return next(new AppError("Unauthorized, please login"));
//         }
    
//         if (user.role === "ADMIN") {
//           return next(new AppError("Admin cannot purchase a subscription", 400));
//         }
    
//         const subscriptionId = user.subscription.id;
    
//         const subscription = await razorpay.subscriptions.cancel(subscriptionId);
    
//         user.subscription.status = subscription.status;
    
//         await user.save();
//       } catch (e) {
//         return next(new AppError(e.message, 500));
//       }    
// };
const verifySubscription = asyncHandler(async (req, res, next) => {
    const { id } = req.user;
    const { razorpay_payment_id, razorpay_signature, razorpay_subscription_id } =
      req.body;
  
    const subscribedUser = await User.findById(id);
  
    if (!subscribedUser) {
      return next(new AppError("Unauthorized request, please login again", 401));
    }
  
    const subscription_id = subscribedUser.subscription.id;
  
    const generateSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_payment_id}|${subscription_id}`)
      .digest("hex");
  
    if (generateSignature !== razorpay_signature) {
      return next(new AppError("Payment not verified, please try again", 400));
    }
  
    await Payment.create({
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id,
    });
  
    subscribedUser.subscription.status = "active";
    await subscribedUser.save();
  
    res.status(200).json({
      success: true,
      message: "Payment verified successfully!",
    });
  });
const cancelSubscription = asyncHandler(async (req, res, next) => {
    const { id } = req.user;
  
    const user = await User.findById(id);
  
    if (!user) {
      return next(new AppError("Unauthorized, please login", 401));
    }
  
    if (user.role === "ADMIN") {
      return next(new AppError("Admin cannot purchase a subscription", 400));
    }
  
    const subscriptionId = user.subscription.id;
  
    try {
      const subscription = await razorpay.subscriptions.cancel(subscriptionId);
      user.subscription.status = subscription.status;
      await user.save();
  
      res.status(200).json({
        success: true,
        message: "Subscription canceled successfully",
      });
    } catch (e) {
      return next(new AppError(e.message, 500));
    }
  });
const allPayments = async (req,res,next) => {
    try {
        const { count } = req.query;

        const subscriptions = await razorpay.subscriptions.all({
            count: count || 10,
        });
    
        res.status(200).json({
            success: true,
            message: 'All payments',
            subscriptions
        })
    } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

export {
    getRazorpayApiKey,
    buySubscription,
    verifySubscription,
    cancelSubscription,
    allPayments
}