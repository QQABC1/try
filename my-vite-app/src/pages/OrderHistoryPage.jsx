import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OrderCard from '../components/OrderCard';

const OrderHistoryPage = () => {
  // 模拟订单数据
  const [orders] = useState([
    {
      orderId: 'ORD-2023-5678',
      hotelName: '三亚海滨度假酒店',
      hotelImage: 'https://picsum.photos/300/200?random=10',
      checkInDate: '2023-10-15',
      checkOutDate: '2023-10-20',
      status: '已确认',
      price: 2999,
    },
    {
      orderId: 'ORD-2023-4321',
      hotelName: '厦门海景大酒店',
      hotelImage: 'https://picsum.photos/300/200?random=11',
      checkInDate: '2023-09-05',
      checkOutDate: '2023-09-10',
      status: '已完成',
      price: 4299,
    },
    {
      orderId: 'ORD-2023-9876',
      hotelName: '北京金融街酒店',
      hotelImage: 'https://picsum.photos/300/200?random=12',
      checkInDate: '2023-10-25',
      checkOutDate: '2023-10-28',
      status: '待支付',
      price: 1899,
    },
    {
      orderId: 'ORD-2023-2468',
      hotelName: '成都春熙路酒店',
      hotelImage: 'https://picsum.photos/300/200?random=13',
      checkInDate: '2023-08-15',
      checkOutDate: '2023-08-18',
      status: '已取消',
      price: 1299,
    },
  ]);

  // 订单状态筛选
  const [activeTab, setActiveTab] = useState('all');

  // 筛选订单
  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeTab);

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">我的订单</h1>
          <p className="text-gray-500">查看和管理您的所有预订</p>
        </div>

        {/* 订单筛选标签 */}
        <div className="bg-white rounded-xl shadow-sm p-2 mb-8 flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'all' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            } transition-colors`}
            onClick={() => setActiveTab('all')}
          >
            全部订单
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === '已确认' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            } transition-colors`}
            onClick={() => setActiveTab('已确认')}
          >
            已确认
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === '待支付' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            } transition-colors`}
            onClick={() => setActiveTab('待支付')}
          >
            待支付
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === '已完成' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            } transition-colors`}
            onClick={() => setActiveTab('已完成')}
          >
            已完成
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === '已取消' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            } transition-colors`}
            onClick={() => setActiveTab('已取消')}
          >
            已取消
          </button>
        </div>

        {/* 订单列表 */}
        <div className="space-y-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <OrderCard
                key={order.orderId}
                {...order}
                onCancel={() => handleCancelOrder(order.orderId)}
              />
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="text-gray-400 text-6xl mb-4">
                <i className="fa fa-file-text-o"></i>
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">暂无订单记录</h3>
              <p className="text-gray-500 mb-6">您还没有任何预订记录，现在就去预订酒店吧！</p>
              <Link to="/hotels" className="inline-flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                <i className="fa fa-search mr-2"></i> 查找酒店
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

// 处理取消订单
const handleCancelOrder = (orderId) => {
  if (window.confirm('确定要取消此订单吗？')) {
    console.log('取消订单:', orderId);
    // 这里可以添加API调用逻辑
  }
};

export default OrderHistoryPage;