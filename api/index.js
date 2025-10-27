
import { connectDB } from './db.js'; // 注意添加 .js 后缀        
import express from 'express';
import authRoutes from './routes/auth.routes.js'
import cors from"cors"
import bookingRoutes from './routes/booking.routes.js';
import hotelRoutes from './routes/hotel.routes.js'
//import roomRoutes from './routes/room.routes.js'

const app = express();
//app使用的库

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // 前端域名
  methods: 'GET,POST,PUT,DELETE',
  credentials: true, // 允许携带 Cookie
}));

//测试
app.get('/api/test', (req, res) => {
  res.send('Hello from Express!');
});


app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
//app.use("/api/rooms", roomRoutes);
app.use("/api/hotels", hotelRoutes);


//测试数据库
async function startServer() {
  await connectDB();
  app.listen(3000, () => {
    console.log('服务器运行在端口 3000');
  });
}

startServer();