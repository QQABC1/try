/*import { Router } from 'express';
import {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom
} from '../controllers/room/room.js';
import auth from '../middleware/auth.js';import adminCheck from '../middleware/adminCheck.js';

const router = Router();

// 获取可用客房（开放权限）
router.get('/', getRooms);

// 管理端操作（需要管理员权限）
router.post('/', createRoom);
router.put('/:id', updateRoom);
router.delete('/:id', deleteRoom);

export default router;*/