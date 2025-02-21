
import { Router } from 'express';

import { contactUs, userStats } from '../controllers/miscellaneous.controller.js';
import { authorizeRoles, isLoggedIn } from '../middlewares/auth.middleware.js';

const router = Router();
/**
 * @route POST /contact
 * @description Handles the contact form submission.
 * @access Public
 */
router.route('/contact').post(contactUs);
/**
 * @route GET /admin/stats/users
 * @description Fetches user statistics for admin.
 * @access Admin only
 */
router
  .route('/admin/stats/users')
  .get(isLoggedIn, authorizeRoles('ADMIN'), userStats);

export default router;