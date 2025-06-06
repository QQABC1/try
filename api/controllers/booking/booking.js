
import mysql from 'mysql2/promise';
import { pool } from "../../db.js";

// 创建订单
export const createBooking = async (req, res) => {
  try {
    const { userId } = req.user;
    const { hotelId, roomTypeId, checkInDate, checkOutDate, guests, totalPrice } = req.body;
    
    const [result] = await pool.query(
      `INSERT INTO bookings 
      (user_id, hotel_id, room_type_id, check_in_date, check_out_date, guests, total_price, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'pending_payment')`,
      [userId, hotelId, roomTypeId, checkInDate, checkOutDate, guests, totalPrice]
    );

    const [newBooking] = await pool.query(
      `SELECT * FROM bookings WHERE id = ?`,
      [result.insertId]
    );

    res.status(201).json(newBooking[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 获取用户订单
export const getBookings = async (req, res) => {
  try {
    const { userId } = req.user;
    
    const [bookings] = await pool.query(
      `SELECT 
        b.*, 
        h.name AS hotel_name,
        r.name AS room_type_name
      FROM bookings b
      JOIN hotels h ON b.hotel_id = h.id
      JOIN room_types r ON b.room_type_id = r.id
      WHERE b.user_id = ?`,
      [userId]
    );

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 取消订单
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    // 检查订单是否存在且属于当前用户
    const [booking] = await pool.query(
      `SELECT * FROM bookings WHERE id = ? AND user_id = ?`,
      [id, userId]
    );

    if (booking.length === 0) {
      return res.status(404).json({ message: '订单不存在或未授权操作' });
    }

    // 更新订单状态
    await pool.query(
      `UPDATE bookings SET status = 'cancelled' WHERE id = ?`,
      [id]
    );

    // 获取更新后的订单
    const [updatedBooking] = await pool.query(
      `SELECT * FROM bookings WHERE id = ?`,
      [id]
    );

    res.json(updatedBooking[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};