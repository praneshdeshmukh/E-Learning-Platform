import { Router } from 'express';
import {
  getRazorpayApiKey,
  buySubscription,
  verifySubscription,
  cancelSubscription,
  allPayments,
} from '../controllers/payment.controller.js';
import {
  authorizeRoles,
  authorizeSubscribers,
  isLoggedIn,
} from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/subscribe').post(isLoggedIn, buySubscription);
router.route('/verify').post(isLoggedIn, verifySubscription);
router
  .route('/unsubscribe')
  .post(isLoggedIn, authorizeSubscribers, cancelSubscription);
router.route('/razorpay-key').get(isLoggedIn, getRazorpayApiKey);
router.route('/').get(isLoggedIn, authorizeRoles('ADMIN'), allPayments);

export default router;

// import { Router } from "express";
// import { authorizeRoles, isLoggedIn } from "../middlewares/auth.middleware.js"
// import { allPayments, buySubscription, cancelSubscription, getRazorpayAPIKey, verifySubscription } from "../controllers/payment.controller.js";
// const paymentRouter = Router();


// paymentRouter
//             .route('/razorpay-key')
//             .get(
//                 isLoggedIn,
//                 getRazorpayAPIKey
//             );
// paymentRouter
//             .route('/subscribe')
//             .post(
//                 isLoggedIn,
//                 buySubscription
//             );
// paymentRouter
//             .route('/verify')
//             .post(
//                 isLoggedIn,
//                 verifySubscription
//             );
// paymentRouter
//             .route('/unsubscribe')
//             .delete(
//                 isLoggedIn,
//                 cancelSubscription
//             );
// paymentRouter
//             .route('/')
//             .get(
//                 isLoggedIn,
//                 authorizeRoles('ADMIN'),
//                 allPayments
//             );
// export default paymentRouter;