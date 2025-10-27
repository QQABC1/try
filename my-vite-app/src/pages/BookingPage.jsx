import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const BookingPage = () => {
  const { hotelId, roomId } = useParams();
  const navigate = useNavigate();
  const [hotelData, setHotelData] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomType: roomId,
    specialRequests: ''
  });

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        setLoading(true);
        
        // 1. 获取酒店信息
        const hotelRes = await fetch(`http://localhost:3000/api/hotels/${hotelId}`);
        if (!hotelRes.ok) {
          throw new Error('获取酒店信息失败');
        }
        const hotelData = await hotelRes.json();
        
        // 2. 获取房型信息
        const roomRes = await fetch(`http://localhost:3000/api/rooms/${roomId}`);
        if (!roomRes.ok) {
          throw new Error('获取房型信息失败');
        }
        const roomData = await roomRes.json();
        
        // 检查房型是否属于该酒店
        if (parseInt(roomData.hotel_id) !== parseInt(hotelId)) {
          throw new Error('该房型不属于此酒店');
        }

        setHotelData(hotelData);
        setRoomData(roomData);
        
        // 设置表单默认值
        setFormData(prevData => ({
          ...prevData,
          roomType: roomData.id,
        }));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelData();
  }, [hotelId, roomId]);

  // 计算总价
  const calculateTotal = () => {
    if (!roomData || !formData.checkIn || !formData.checkOut) return 0;
    
    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    
    return nights * (roomData.price || 0);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    try {
      // 获取认证token
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('请先登录');
      }
      
      // 准备订单数据
      const bookingData = {
        hotel_id: hotelId,
        room_type_id: formData.roomType,
        check_in_date: formData.checkIn,
        check_out_date: formData.checkOut,
        guests: parseInt(formData.guests),
        total_price: calculateTotal(),
        special_requests: formData.specialRequests
      };
      
      // 发送创建订单请求
      const response = await fetch('http://localhost:3000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || '创建订单失败');
      }
      
      // 订单创建成功，跳转到订单详情页
      navigate(`/booking/success/${data.id}`);
      
    } catch (err) {
      setSubmitError(err.message);
    }
  };

  // 加载状态和错误状态的UI保持不变...
  
  return (
    <main className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* 酒店信息部分 */}
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {hotelData?.name || '酒店名称'}
            </h1>
            <p className="text-gray-600 mb-4 flex items-center">
              <i className="fas fa-map-marker-alt mr-2 text-blue-500"></i>
              {hotelData?.location || '酒店地址'}
            </p>
            
            {roomData && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {roomData.name || '房型名称'}
                </h2>
                <p className="text-gray-700 mb-2">
                  {roomData.description || '房型描述'}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-600">
                    ¥{roomData.price?.toFixed(2) || '0.00'} <span className="text-sm font-normal text-gray-500">每晚</span>
                  </span>
                </div>
              </div>
            )}
          </div>
          
          {/* 预订表单 */}
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">填写预订信息</h2>
            
            {submitError && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4">
                {submitError}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">入住日期</label>
                  <input
                    type="date"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">退房日期</label>
                  <input
                    type="date"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleChange}
                    min={formData.checkIn || new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">入住人数</label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} 人</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">特殊要求</label>
                  <input
                    type="text"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    placeholder="例如：需要婴儿床、无烟房等"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
              
              {/* 价格摘要 */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">价格摘要</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>房费</span>
                    <span>¥{roomData?.price?.toFixed(2) || '0.00'} × {calculateTotal() / (roomData?.price || 1)} 晚</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t border-gray-200">
                    <span>总计</span>
                    <span className="text-blue-600">¥{calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
              >
                确认预订
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookingPage;