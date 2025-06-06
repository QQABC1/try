import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="container mx-auto px-4">
        {/* 顶部链接区 */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 py-12">
          {/* 公司信息 */}
          <div>
            <h3 className="text-lg font-medium mb-4">关于我们</h3>
            <p className="text-gray-400">
              专业酒店预订平台，致力于为用户提供便捷、高性价比的住宿体验。
            </p>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="text-lg font-medium mb-4">快速链接</h3>
            <div className="space-y-2">
              <Link to="/about" className="text-gray-400 hover:text-white transition-colors">关于我们</Link>
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">联系我们</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">使用条款</Link>
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">隐私政策</Link>
            </div>
          </div>

          {/* 支持中心 */}
          <div>
            <h3 className="text-lg font-medium mb-4">支持中心</h3>
            <div className="space-y-2">
              <Link to="/help" className="text-gray-400 hover:text-white transition-colors">帮助中心</Link>
              <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">常见问题</Link>
              <Link to="/support" className="text-gray-400 hover:text-white transition-colors">联系客服</Link>
            </div>
          </div>

          {/* 合作伙伴 */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-medium mb-4">合作伙伴</h3>
            <div className="space-y-2">
              <Link to="/partners" className="text-gray-400 hover:text-white transition-colors">成为合作伙伴</Link>
              <Link to="/affiliate" className="text-gray-400 hover:text-white transition-colors">加盟计划</Link>
            </div>
          </div>
        </div>

        {/* 底部版权区 */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} HotelBooking 保留所有权利
            </div>

            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">首页</Link>
              <Link to="/sitemap" className="text-sm text-gray-400 hover:text-white transition-colors">网站地图</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;