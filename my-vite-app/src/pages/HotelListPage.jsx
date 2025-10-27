import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HotelCard from '../components/HotelCard';
import RatingStars from '../components/RatingStars';

const HotelListPage = () => {
  // 酒店数据状态
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 分页和排序状态
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('rating-desc');
  const hotelsPerPage = 4; // 每页显示4个酒店

  // 从API获取酒店数据
  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // 替换为您的API端点
        const response = await fetch('/api/hotels');
        
        if (!response.ok) {
          throw new Error('Failed to fetch hotels');
        }
        
        const data = await response.json();
        console.log('API返回的数据:', data); // 添加日志，查看返回格式
        
        // 关键修改：从响应中提取实际的酒店数组
        setHotels(data.data || []); // 如果data.data不存在，使用空数组
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHotels();
  }, []);

  // 排序函数
  const sortedHotels = [...hotels].sort((a, b) => {
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

      {/* 加载状态 */}
      {loading && (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* 错误状态 */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">错误：</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* 酒店列表 */}
      {!loading && !error && hotels.length > 0 && (
        <>
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
        </>
      )}

      {/* 无酒店数据 */}
      {!loading && !error && hotels.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500">暂无酒店数据</p>
        </div>
      )}

      {/* 分页导航 */}
      {!loading && !error && totalPages > 1 && hotels.length > 0 && (
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
