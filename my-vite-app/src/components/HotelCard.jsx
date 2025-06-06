import React from 'react';
import { Link } from 'react-router-dom';

const HotelCard = ({
  imageUrl = "https://picsum.photos/300/200?random=1",
  title="海滨度假酒店",
  rating=4.5,
  price=899,
  location="三亚市亚龙湾",
  amenities=["免费WiFi", "游泳池", "健身房"],
}) => {
  return (
    <Link to="/hotel/1" className="group relative block rounded-lg overflow-hidden shadow-md transition-shadow duration-300 hover:shadow-lg">
      <div className="aspect-w-4 aspect-h-3">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4">
        {/* 评分与价格 */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-1">
            <span className="text-lg font-medium">{rating}</span>
            <span className="text-sm text-gray-500">评分</span>
          </div>

          <div className="text-lg font-bold text-blue-600">
            ¥{price}
            <span className="text-sm text-gray-500">/晚</span>
          </div>
        </div>

        {/* 酒店名称与位置 */}
        <h3 className="text-lg font-medium mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{location}</p>

        {/* 设施列表 */}
        <div className="mt-3 flex space-x-2">
          {amenities.map((item, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
              {item}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;