import express from 'express';
import { register, login, logout,} from '../controllers/auth/auth.js';
const router = express.Router();
// 用户注册
router.post('/register', 
  register
);

// 用户登录
router.post('/login',  
  login
);

// 社交登录路由示例


export default router;