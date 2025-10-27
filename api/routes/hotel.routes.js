import { Router } from 'express';
import {
  getHotels,
  createHotels,
  updateHotels,
  deleteHotels
} from '../controllers/hotel/hotel.js';
//import auth from '../middleware/auth.js';
//import adminCheck from '../middleware/adminCheck.js';

const router = Router();

// 公共接口
router.get('/', getHotels);

// 管理接口
/*router.post('/', auth, adminCheck, createHotel);
router.route('/:id')
  .put(auth, adminCheck, updateHotel)
  .delete(auth, adminCheck, deleteHotel);
*/
export default router;