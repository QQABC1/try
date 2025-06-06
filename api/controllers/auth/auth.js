import { pool } from "../../db.js";
import bcrypt from 'bcrypt';
// auth.js - 用户认证模块（登录、注册、登出）
import jwt from 'jsonwebtoken'; // JWT 令牌库


// 密钥和 Cookie 配置（从 .env 文件读取或使用默认值）
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const COOKIE_OPTIONS = {
  httpOnly: true, // 防止 XSS 攻击（禁止 JavaScript 访问 Cookie）
  secure: process.env.NODE_ENV === 'production', // 生产环境必须使用 HTTPS
  sameSite: 'strict', // 防止 CSRF 攻击
  maxAge: 7 * 24 * 60 * 60 * 1000 // 有效期 7 天（毫秒）
};

// 注册功能
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ 
        error: '缺少必填字段',
        requiredFields: ['name', 'email', 'password']
      });
    }
    // 2. 检查邮箱是否已被注册
    const [users] = await pool.execute(
      'SELECT id FROM users WHERE email = ?', 
      [email]
    );
    if (users.length > 0) {
      return res.status(400).json({ error: '邮箱已被注册' });
    }

    // 3. 加密用户密码（使用 bcrypt 生成哈希值）
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4. 将用户信息存入数据库
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );
    const userId = result.insertId; // 获取新用户的 ID

    // 5. 生成 JWT 令牌（包含用户 ID）
    const token = jwt.sign(
      { userId }, // 令牌包含的信息（可自定义）
      JWT_SECRET, // 加密密钥
      { expiresIn: '7d' } // 有效期 7 天
    );

    // 6. 将令牌存入 Cookie（浏览器会自动管理）
    res.cookie('token', token, COOKIE_OPTIONS);

    // 7. 返回成功响应给客户端
    res.status(201).json({ 
      message: '注册成功',
      user: { id: userId, name }
    });

  } catch (error) {
    console.error('注册错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

// 登录功能
export const login = async (req, res) => {
  try {
    // 1. 从请求中获取用户输入的邮箱和密码
    const { email, password } = req.body;

    // 2. 从数据库查询用户信息
    const [users] = await pool.execute(
      'SELECT id, name, password FROM users WHERE email = ?',
      [email]
    );
    const user = users[0];

    // 3. 检查用户是否存在
    if (!user) {
      return res.status(401).json({ error: '邮箱或密码错误' });
    }

    // 4. 验证密码（比较明文密码与数据库中的哈希值）
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: '邮箱或密码错误' });
    }

    // 5. 生成 JWT 令牌（与注册逻辑相同）
    const token = jwt.sign(
      { userId: user.id }, 
      JWT_SECRET, 
      { expiresIn: '7d' }
    );

    // 6. 将令牌存入 Cookie
    res.cookie('token', token, COOKIE_OPTIONS);

    // 7. 返回成功响应（包含用户基本信息）
    res.json({
      message: '登录成功',
      user: { id: user.id, name: user.name }
    });

  } catch (error) {
    console.error('登录错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

// 登出功能
export const logout = (req, res) => {
  // 清除客户端的 Cookie（通过设置过期时间为过去）
  res.clearCookie('token', COOKIE_OPTIONS);
  res.json({ message: '已登出' });
};

