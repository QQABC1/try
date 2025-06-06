import React from 'react';
import { Link } from 'react-router-dom'; // 引入 Link 组件

const RoomCard = ({
  roomId = 'rm-101',
  hotelId = 'hotel-1', // 添加 hotelId 参数
  title = '豪华海景房',
  description = '40平方米，大床，私人阳台，海景',
  price = 1299,
  originalPrice = 1599,
  currency = '¥',
  maxGuests = 2,
  facilities = ['免费WiFi', '空调', '浴缸', '迷你冰箱'],
  isAvailable = true,
  onBook = () => console.log('预订房间'),
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all hover:shadow-lg">
      {/* 房间图片区域 */}
      <div className="relative">
        <img
          src={`https://picsum.photos/600/400?random=${roomId}`}
          alt={title}
          className="w-full h-48 object-cover"
        />
        {/* 可用状态标签 */}
        {isAvailable ? (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
            可预订
          </span>
        ) : (
          <span className="absolute top-3 left-3 bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded">
            已订满
          </span>
        )}
      </div>

      {/* 房间信息区域 */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <div className="text-right">
            <div className="text-gray-400 line-through text-sm">
              {currency}{originalPrice}/晚
            </div>
            <div className="text-blue-600 font-bold text-xl">
              {currency}{price}/晚
            </div>
          </div>
        </div>

        <p className="text-gray-600 mb-4">{description}</p>

        {/* 设施标签 */}
        <div className="flex flex-wrap gap-2 mb-5">
          {facilities.map((facility, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
            >
              {facility}
            </span>
          ))}
        </div>

        {/* 底部信息和按钮 */}
        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <span className="text-sm">{maxGuests}人入住</span>
          </div>

          {/* 修改按钮为 Link 组件 */}
          {isAvailable ? (
            <Link
              to={`/booking/${hotelId}/${roomId}`}
              className="px-5 py-2 rounded-lg font-medium text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              立即预订
            </Link>
          ) : (
            <button
              disabled
              className="px-5 py-2 rounded-lg font-medium text-sm bg-gray-300 text-gray-500 cursor-not-allowed"
            >
              已订满
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomCard;