import React from 'react';
import { Link } from 'react-router-dom';

const OrderCard = ({
  orderId = 'ORD-2023-5678',
  hotelName = '三亚海滨度假酒店',
  hotelImage = 'https://picsum.photos/300/200?random=10',
  checkInDate = '2023-10-15',
  checkOutDate = '2023-10-20',
  status = '已确认',
  price = 2999,
  currency = '¥',
  onCancel = () => console.log('取消订单'),
}) => {
  // 根据订单状态设置颜色
  const getStatusColor = () => {
    switch (status) {
      case '已确认':
        return 'text-green-600 bg-green-50';
      case '待支付':
        return 'text-yellow-600 bg-yellow-50';
      case '已取消':
        return 'text-red-600 bg-red-50';
      case '已完成':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all hover:shadow-lg">
      <div className="flex flex-col md:flex-row">
        {/* 左侧图片 */}
        <div className="md:w-1/3">
          <img
            src={hotelImage}
            alt={hotelName}
            className="w-full h-48 md:h-full object-cover"
          />
        </div>

        {/* 右侧信息 */}
        <div className="p-6 md:w-2/3">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{hotelName}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
              {status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">入住日期</p>
              <p className="font-medium">{checkInDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">退房日期</p>
              <p className="font-medium">{checkOutDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">订单编号</p>
              <p className="font-medium text-gray-700">{orderId}</p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
            <div>
              <p className="text-sm text-gray-500">总价</p>
              <p className="text-xl font-bold text-gray-800">
                {currency}{price}
                <span className="text-sm font-normal text-gray-500">/ 5晚</span>
              </p>
            </div>

            <div className="flex space-x-2">
              <Link to={`/order/${orderId}`} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                查看详情
              </Link>
              {status !== '已取消' && status !== '已完成' && (
                <button
                  onClick={onCancel}
                  className="px-4 py-2 border border-red-300 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  取消订单
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;