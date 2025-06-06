import express from 'express';
import { 
  createBooking,
  getBookings,
  cancelBooking
} from '../controllers/booking/booking.js';


const router = express.Router();

// 创建订单
router.post('/',createBooking);

// 获取用户订单
router.get('/user', getBookings);

// 取消订单
router.put('/:id/cancel', cancelBooking);

export default router;