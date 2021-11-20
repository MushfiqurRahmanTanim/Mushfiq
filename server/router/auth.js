import express from 'express';
import { protect } from '../middleware/protect.js';
import { activeUser, changePassword, getUserById, getUserProfile, login, register, requestResetPassword, updateUserProfile } from '../controllers/userCtrl.js';
const router = express.Router();

router
  .route('/profile')
  .get(protect,getUserProfile)
  .put(protect, updateUserProfile);

 
router.post('/register', register);
// router.post('/active', activeUser);
router.post('/login', login);
router.post('/forget-password', requestResetPassword);
router.post('/change-password', changePassword);
router.get('/:id',protect, getUserById);

export default router