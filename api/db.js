// db.js
import mysql from 'mysql2/promise';

// 创建连接池
 const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'hotel',
});

// 测试连接
async function connectDB() {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log('MySQL 数据库连接成功');
  } catch (error) {
    console.error('MySQL 数据库连接失败:', error.message);
    process.exit(1); // 连接失败时退出应用
  }
}

export { pool, connectDB };