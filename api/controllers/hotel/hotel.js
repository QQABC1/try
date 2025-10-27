import { pool } from "../../db.js";


export const getHotels = async (req, res) => {
  try {
    console.log("开始查询酒店数据..."); // 添加日志标记
    
    const query = `
      SELECT h.*, 
        (SELECT COUNT(*) FROM rooms 
         WHERE hotel_id = h.id) AS total_rooms
      FROM hotels h
      ORDER BY h.rating DESC, h.created_at DESC
    `;

    const [results] = await pool.query(query);
    console.log(`查询成功，返回 ${results.length} 条数据`);
    
    res.json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (err) {
    // 关键：返回详细错误信息
    console.error("数据库查询错误:", err);
    res.status(500).json({
      success: false,
      error: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
  }
};
export const updateHotels = () => {

};
export const deleteHotels = () => {

};
export const createHotels = () => {

};