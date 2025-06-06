import React from 'react';
import { Link } from 'react-router-dom';
import RoomCard from '../components/RoomCard';
import RatingStars from '../components/RatingStars';

const HotelDetailPage = () => {
  // 模拟酒店数据
  const hotelData = {
    id: 1,
    name: '三亚海滨度假酒店',
    location: '三亚市海棠湾区',
    description: '位于三亚海棠湾的豪华度假酒店，拥有私人海滩和多个泳池，提供全方位的休闲娱乐设施和优质服务。',
    rating: 4.8,
    reviewCount: 1243,
    facilities: ['私人海滩', '无边泳池', '健身房', 'SPA', '餐厅', '免费WiFi'],
    images: [
      'https://picsum.photos/1200/400?random=10',
      'https://picsum.photos/600/400?random=11',
      'https://picsum.photos/600/400?random=12',
      'https://picsum.photos/600/400?random=13',
    ],
    rooms: [
      {
        roomId: 'rm-101',
        title: '豪华海景房',
        description: '40平方米，大床，私人阳台，海景',
        price: 1299,
        originalPrice: 1599,
        maxGuests: 2,
        facilities: ['免费WiFi', '空调', '浴缸', '迷你冰箱'],
        isAvailable: true,
      },
      {
        roomId: 'rm-201',
        title: '行政套房',
        description: '60平方米，独立客厅，大床，海景',
        price: 2599,
        originalPrice: 2999,
        maxGuests: 2,
        facilities: ['私人泳池', '客厅', '免费早餐', '行政礼遇'],
        isAvailable: false,
      },
      {
        roomId: 'rm-301',
        title: '家庭套房',
        description: '80平方米，双卧室，客厅，家庭友好',
        price: 3299,
        originalPrice: 3699,
        maxGuests: 4,
        facilities: ['儿童乐园', '家庭影院', '厨房', '洗衣机'],
        isAvailable: true,
      },
    ],
  };

  return (
    <main className="bg-gray-50">
      {/* 酒店大图轮播 */}
      <section className="relative h-80 overflow-hidden">
        <img
          src={hotelData.images[0]}
          alt={hotelData.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {hotelData.name}
            </h1>
            <div className="flex items-center text-white mb-4">
              <RatingStars rating={hotelData.rating} />
              <span className="ml-2 text-sm text-white/80">
                ({hotelData.reviewCount}条评价)
              </span>
              <span className="mx-2 text-white/50">•</span>
              <span className="text-sm text-white/80">
                {hotelData.location}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* 酒店描述和设施 */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">酒店介绍</h2>
          <p className="text-gray-600 mb-6">{hotelData.description}</p>

          <h3 className="text-lg font-semibold mb-3">酒店设施</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {hotelData.facilities.map((facility, index) => (
              <div key={index} className="flex items-center text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-500 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{facility}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 房型列表 */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">可用房型</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hotelData.rooms.map((room) => (
              <RoomCard key={room.roomId} {...room} />
            ))}
          </div>
        </section>

        {/* 用户评价预览 */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">用户评价</h2>
          <div className="flex flex-col space-y-6">
            {/* 评价卡片1 */}
            <div className="border-b border-gray-100 pb-6">
              <div className="flex items-center mb-3">
                <img
                  src="https://picsum.photos/100/100?random=20"
                  alt="用户头像"
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <h4 className="font-medium text-gray-800">张先生</h4>
                  <RatingStars rating={4.8} />
                </div>
              </div>
              <p className="text-gray-600">
                酒店位置绝佳，海景房视野开阔，服务人员非常热情，早餐品种丰富。唯一不足是泳池人有点多，建议早上去。
              </p>
              <div className="mt-3 text-sm text-gray-500">
                2023年10月入住
              </div>
            </div>

            {/* 评价卡片2 */}
            <div>
              <div className="flex items-center mb-3">
                <img
                  src="https://picsum.photos/100/100?random=21"
                  alt="用户头像"
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <h4 className="font-medium text-gray-800">李女士</h4>
                  <RatingStars rating={5.0} />
                </div>
              </div>
              <p className="text-gray-600">
                这是我们第三次入住这家酒店，每次都有惊喜。房间干净整洁，设施完善，SPA服务特别推荐，是放松身心的好地方。
              </p>
              <div className="mt-3 text-sm text-gray-500">
                2023年9月入住
              </div>
            </div>
          </div>

          <button className="mt-6 text-blue-600 font-medium hover:underline">
            查看全部1243条评价
          </button>
        </section>

        {/* 位置和地图 */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">酒店位置</h2>
          <div className="h-64 bg-gray-200 rounded-lg overflow-hidden relative">
            {/* 地图占位 */}
            <img
              src="https://picsum.photos/1200/400?random=30"
              alt="酒店地图"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700">
                查看完整地图
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HotelDetailPage;