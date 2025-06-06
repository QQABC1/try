import React from 'react';

const RatingStars = ({ rating = 4.5, totalStars = 5 }) => {
  // 计算实心星星数量和半星状态
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-0.5 text-yellow-400">
      {/* 实心星星 */}
      {[...Array(fullStars)].map((_, index) => (
        <span key={index} className="star-solid">&#9733;</span> // ★ 实心星
      ))}

      {/* 半星 */}
      {hasHalfStar && (
        <span className="star-half">&#9734;</span> // ☆ 半星
      )}

      {/* 空心星星 */}
      {[...Array(emptyStars)].map((_, index) => (
        <span key={index} className="star-empty">&#9734;</span> // ☆ 空心星
      ))}

      <span className="ml-1 text-sm text-gray-500">
        ({rating.toFixed(1)}分 / {totalStars}分)
      </span>
    </div>
  );
};

// 样式可通过 CSS 自定义
const starStyles = `
  .star-solid, .star-half, .star-empty {
    font-size: 1.25rem;
    line-height: 1;
  }

  .star-empty {
    color: #e0e0e0; // 空心星颜色
  }
`;

export default RatingStars;