// import { Router } from "express";
// import { changePassword, forgotPassword, getProfile, login, logout, register, resetPassword, updateUser } from "../controllers/user.controller.js";
import { Router } from "express";
import {
  changePassword,
  forgotPassword,
  getLoggedInUserDetails,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateUser,
} from "../controllers/user.controller.js";

// import { isLoggedIn } from "../middlewares/auth.middleware.js";
// import upload from "../middlewares/multer.middleware.js";


import { isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();
// const router = Router();

router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", isLoggedIn, getLoggedInUserDetails);
router.post("/reset", forgotPassword);
router.post("/reset/:resetToken", resetPassword);
router.post("/change-password", isLoggedIn, changePassword);
router.put("/update/:id", isLoggedIn, upload.single("avatar"), updateUser);

export default router;


// router.post('/register', upload.single("avatar"), register); // done
// router.post('/login', login); // password match from db isnt working
// router.get('/logout',isLoggedIn ,logout); // done 
// router.get('/me', isLoggedIn, getProfile); // done
// router.post('/reset', forgotPassword); // done
// router.post('/reset/:resetToken', resetPassword); // done
// router.post('/change-password', isLoggedIn, changePassword); // done
// router.put('/update/:id', isLoggedIn, upload.single("avatar"), updateUser);

// export default router;
// {
//     "email":"pranjal@gmail.com",
//     "password":"9975460231"
// }
// {
//     "oldPassword":"8087879155",
//     "newPassword":"9975460231"
// }
