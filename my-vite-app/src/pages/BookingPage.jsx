import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const BookingPage = () => {
  const { hotelId, roomId } = useParams();
  const [formData, setFormData] = useState({
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    guests: 1,
    roomType: '',
    specialRequests: '',
  });
  const [hotelData, setHotelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 模拟从API加载酒店数据
  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        // 实际项目中这里应该调用API获取数据
        // 模拟API延迟
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // 模拟酒店数据
        const mockHotelData = {
          id: parseInt(hotelId),
          name: '三亚海滨度假酒店',
          location: '三亚市海棠湾区',
          description: '位于三亚海棠湾的豪华度假酒店，拥有私人海滩和多个泳池，提供全方位的休闲娱乐设施和优质服务。',
          rating: 4.8,
          reviewCount: 1243,
          roomTypes: {
            '豪华海景房': {
              id: 'rm-101',
              price: 1299,
              description: '40平方米，大床，私人阳台，海景',
            },
            '行政套房': {
              id: 'rm-201',
              price: 2599,
              description: '60平方米，独立客厅，大床，海景',
            },
            '家庭套房': {
              id: 'rm-301',
              price: 3299,
              description: '80平方米，双卧室，客厅，家庭友好',
            },
          },
        };

        // 根据roomId查找对应的房型名称
        const selectedRoom = Object.values(mockHotelData.roomTypes).find(
          room => room.id === roomId
        );

        if (!selectedRoom) {
          throw new Error('未找到该房型');
        }

        setHotelData(mockHotelData);
        setFormData(prevData => ({
          ...prevData,
          roomType: selectedRoom.id,
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
    if (!hotelData || !formData.roomType) return 0;
    
    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const room = Object.values(hotelData.roomTypes).find(
      room => room.id === formData.roomType
    );
    
    return nights * (room?.price || 0);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 处理表单提交逻辑
    console.log('提交预订:', formData);
    // 这里可以添加API调用逻辑
  };

  if (loading) {
    return (
      <main className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-700">加载酒店信息中...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="text-red-500 text-3xl mb-4">
            <i className="fa fa-exclamation-circle"></i>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">加载失败</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link to="/hotels" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            返回酒店列表
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧：预订表单 */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h1 className="text-2xl font-bold mb-6">完成您的预订</h1>
              
              <form onSubmit={handleSubmit}>
                {/* 入住和退房日期 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-1">
                      入住日期
                    </label>
                    <input
                      type="date"
                      id="checkIn"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-1">
                      退房日期
                    </label>
                    <input
                      type="date"
                      id="checkOut"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* 客人和房型 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                      客人数量
                    </label>
                    <input
                      type="number"
                      id="guests"
                      name="guests"
                      min="1"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 mb-1">
                      房型
                    </label>
                    <select
                      id="roomType"
                      name="roomType"
                      value={formData.roomType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {hotelData && Object.values(hotelData.roomTypes).map((room) => (
                        <option key={room.id} value={room.id}>
                          {room.id} - {room.description} ({room.price}元/晚)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 特殊要求 */}
                <div className="mb-6">
                  <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
                    特殊要求（可选）
                  </label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    rows="3"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="如需要婴儿床、提前入住等，请在此说明"
                  ></textarea>
                </div>

                {/* 联系信息 */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-4">联系信息</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        姓名
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="请输入您的姓名"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        手机号码
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="请输入您的手机号码"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        电子邮箱
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="请输入您的电子邮箱"
                      />
                    </div>
                  </div>
                </div>

                {/* 付款信息 */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-4">付款方式</h2>
                  <div className="space-y-3">
                    <div className="flex items-center p-4 border border-gray-300 rounded-lg">
                      <input
                        type="radio"
                        id="payment-wechat"
                        name="paymentMethod"
                        value="wechat"
                        defaultChecked
                        className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="payment-wechat" className="ml-3 block text-sm font-medium text-gray-700">
                        <img src="https://picsum.photos/40/40?random=1" alt="微信支付" className="h-6 inline-block mr-2" />
                        微信支付
                      </label>
                    </div>
                    <div className="flex items-center p-4 border border-gray-300 rounded-lg">
                      <input
                        type="radio"
                        id="payment-alipay"
                        name="paymentMethod"
                        value="alipay"
                        className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="payment-alipay" className="ml-3 block text-sm font-medium text-gray-700">
                        <img src="https://picsum.photos/40/40?random=2" alt="支付宝" className="h-6 inline-block mr-2" />
                        支付宝
                      </label>
                    </div>
                    <div className="flex items-center p-4 border border-gray-300 rounded-lg">
                      <input
                        type="radio"
                        id="payment-card"
                        name="paymentMethod"
                        value="card"
                        className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="payment-card" className="ml-3 block text-sm font-medium text-gray-700">
                        <img src="https://picsum.photos/40/40?random=3" alt="银行卡" className="h-6 inline-block mr-2" />
                        银行卡
                      </label>
                    </div>
                  </div>
                </div>

                {/* 同意条款 */}
                <div className="mb-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="text-gray-600">
                        我已阅读并同意<a href="#" className="text-blue-600 hover:underline">《用户预订条款》</a>和<a href="#" className="text-blue-600 hover:underline">《隐私政策》</a>
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  确认并支付 {calculateTotal()} 元
                </button>
              </form>
            </div>
          </div>

          {/* 右侧：订单摘要 */}
          <div className="lg:w-1/3">
            <div className="sticky top-6 bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">订单摘要</h2>
              
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <img
                    src="https://picsum.photos/100/100?random=10"
                    alt={hotelData?.name}
                    className="w-16 h-16 rounded-lg object-cover mr-3"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">{hotelData?.name}</h3>
                    <p className="text-sm text-gray-500">{hotelData?.location}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                  <div>
                    <p className="text-gray-500">入住</p>
                    <p className="font-medium">{formData.checkIn}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">退房</p>
                    <p className="font-medium">{formData.checkOut}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">客人</p>
                    <p className="font-medium">{formData.guests}位</p>
                  </div>
                  <div>
                    <p className="text-gray-500">房型</p>
                    <p className="font-medium">
                      {hotelData && 
                        Object.values(hotelData.roomTypes).find(
                          room => room.id === formData.roomType
                        )?.description || '选择房型'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">房费</span>
                  <span className="font-medium">
                    {hotelData && 
                      Object.values(hotelData.roomTypes).find(
                        room => room.id === formData.roomType
                      )?.price || 0}元/晚
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">入住天数</span>
                  <span className="font-medium">
                    {Math.ceil((new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24))}晚
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">服务费</span>
                  <span className="font-medium">0元</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">税费</span>
                  <span className="font-medium">0元</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 pb-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>总计</span>
                  <span>¥{calculateTotal()}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">包含所有税费和服务费</p>
              </div>
              
              <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
                <h3 className="font-medium text-blue-800 mb-2">预订保障</h3>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-blue-500 mt-1 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>免费取消（入住前48小时）</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-blue-500 mt-1 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>价格保障，预订后不变</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-blue-500 mt-1 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>24/7 客户支持</span>
                  </li>
                </ul>
              </div>
              
              <Link to="/hotels" className="block text-center text-gray-600 mt-6 hover:underline">
                返回酒店列表
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookingPage;