import express from 'express';
const router = express.Router();
import authController from '../controllers/authController.js';

// 用户注册
router.post('/register', 
  authController.register
);

// 用户登录
router.post('/login', 
  authController.login
);

// 社交登录路由示例
router.get('/google', authController.googleLogin);
router.get('/google/callback', authController.googleCallback);

export default router;