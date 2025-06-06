import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HotelCard from '../components/HotelCard';
import RatingStars from '../components/RatingStars';

const HotelListPage = () => {
  // 模拟酒店数据
  const mockHotels = [
    {
      id: 1,
      imageUrl: "https://picsum.photos/300/200?random=1",
      title: "三亚海棠湾豪华度假酒店",
      rating: 4.8,
      price: 1299,
      location: "三亚市海棠湾区",
      amenities: ["私人海滩", "无边泳池", "免费早餐"]
    },
    {
      id: 2,
      imageUrl: "https://picsum.photos/300/200?random=2",
      title: "上海外滩江景酒店",
      rating: 4.6,
      price: 1599,
      location: "上海市黄浦区外滩",
      amenities: ["全景落地窗", "健身房", "24小时管家服务"]
    },
    {
      id: 3,
      imageUrl: "https://picsum.photos/300/200?random=3",
      title: "北京王府井精品酒店",
      rating: 4.7,
      price: 999,
      location: "北京市东城区王府井",
      amenities: ["地铁直达", "商务中心", "免费WiFi"]
    },
    {
      id: 4,
      imageUrl: "https://picsum.photos/300/200?random=4",
      title: "广州珠江新城酒店",
      rating: 4.5,
      price: 899,
      location: "广州市天河区珠江新城",
      amenities: ["高空观景台", "SPA", "自助早餐"]
    },
    {
      id: 5,
      imageUrl: "https://picsum.photos/300/200?random=5",
      title: "成都春熙路酒店",
      rating: 4.4,
      price: 699,
      location: "成都市锦江区春熙路",
      amenities: ["步行街附近", "免费停车", "会议室"]
    },
    {
      id: 6,
      imageUrl: "https://picsum.photos/300/200?random=6",
      title: "杭州西湖畔酒店",
      rating: 4.9,
      price: 1399,
      location: "杭州市西湖区",
      amenities: ["湖景房", "私人花园", "游船服务"]
    }
  ];

  // 分页和排序状态
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('rating-desc');
  const hotelsPerPage = 4; // 每页显示4个酒店

  // 排序函数
  const sortedHotels = [...mockHotels].sort((a, b) => {
    if (sortBy === 'rating-desc') return b.rating - a.rating;
    if (sortBy === 'rating-asc') return a.rating - b.rating;
    return 0;
  });

  // 计算当前页显示的酒店
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = sortedHotels.slice(indexOfFirstHotel, indexOfLastHotel);

  // 计算总页数
  const totalPages = Math.ceil(sortedHotels.length / hotelsPerPage);

  // 页码列表生成
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <main className="container mx-auto px-4 py-12">
      {/* 排序栏 */}
      <div className="mb-12">
        <div className="bg-white rounded-lg shadow-md p-6">
          <label className="text-sm font-medium text-gray-700">排序方式：</label>
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1); // 切换排序时重置到第一页
            }}
            className="ml-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500"
          >
            <option value="rating-desc">评分从高到低</option>
            <option value="rating-asc">评分从低到高</option>
          </select>
        </div>
      </div>

      {/* 酒店列表 */}
      <h2 className="text-2xl font-bold mb-8">热门酒店推荐</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {currentHotels.map(hotel => (
          <Link to={`/hotel/${hotel.id}`} key={hotel.id} className="block">
            <HotelCard
              imageUrl={hotel.imageUrl}
              title={hotel.title}
              rating={hotel.rating}
              price={hotel.price}
              location={hotel.location}
              amenities={hotel.amenities}
            />
          </Link>
        ))}
      </div>

      {/* 分页导航 */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            {/* 上一页按钮 */}
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 bg-white border border-gray-300 text-sm font-medium rounded-l-md 
                          ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              上一页
            </button>

            {/* 页码按钮 */}
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`px-4 py-2 bg-white border-t border-b border-gray-300 text-sm font-medium 
                            ${number === currentPage ? 'bg-blue-50 text-blue-600 border-blue-300' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                {number}
              </button>
            ))}

            {/* 下一页按钮 */}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 bg-white border border-gray-300 text-sm font-medium rounded-r-md 
                          ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              下一页
            </button>
          </nav>
        </div>
      )}
    </main>
  );
};

export default HotelListPage;