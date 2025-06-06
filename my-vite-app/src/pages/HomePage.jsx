import React from 'react';
import { Link } from 'react-router-dom';
import HotelCard from '../components/HotelCard';
import RatingStars from '../components/RatingStars';

const HomePage = () => {
  // 模拟热门酒店数据
  const popularHotels = [
    {
      id: 1,
      imageUrl: "https://picsum.photos/800/400?random=1",
      title: "三亚海棠湾豪华度假酒店",
      rating: 4.8,
      price: 1299,
      location: "三亚市海棠湾区",
      amenities: ["私人海滩", "无边泳池", "免费早餐"]
    },
    {
      id: 2,
      imageUrl: "https://picsum.photos/800/400?random=2",
      title: "上海外滩江景酒店",
      rating: 4.6,
      price: 1599,
      location: "上海市黄浦区外滩",
      amenities: ["全景落地窗", "健身房", "24小时管家服务"]
    }
  ];

  return (
    <main className="bg-gray-40">
      {/* 英雄Banner */}
      <section className="relative">
       <div className="h-50 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/1920/800?random=3')" }}></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 py-24 text-white text-center">
          <h1 className="text-4xl font-bold mb-4">全球精选酒店，开启美好旅程</h1>
          <p className="text-lg mb-8">覆盖100+国家，5000+优质酒店任你选</p>
        </div>
      </section>

      {/* 特色服务 */}
      <section className="container mx-auto px-4 py-16 space-y-12">
        <h2 className="text-3xl font-bold text-center mb-8">我们的特色服务</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-600">✈️</span>
            </div>
            <div>
              <h3 className="text-lg font-medium">全球覆盖</h3>
              <p className="text-gray-500">超过100个国家和地区的优质酒店资源</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-green-600">💰</span>
            </div>
            <div>
              <h3 className="text-lg font-medium">价格保障</h3>
              <p className="text-gray-500">同酒店同日期，价格低于同业赔付差价</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-yellow-600">24h</span>
            </div>
            <div>
              <h3 className="text-lg font-medium">全天候服务</h3>
              <p className="text-gray-500">7×24小时客服热线，随时为您解决问题</p>
            </div>
          </div>
        </div>
      </section>

      {/* 热门酒店推荐 */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">热门酒店推荐</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {popularHotels.map(hotel => (
            <HotelCard
              key={hotel.id}
              imageUrl={hotel.imageUrl}
              title={hotel.title}
              rating={hotel.rating}
              price={hotel.price}
              location={hotel.location}
              amenities={hotel.amenities}
            />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/hotels" className="text-blue-600 font-medium hover:underline">
            查看更多热门酒店 →
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HomePage;