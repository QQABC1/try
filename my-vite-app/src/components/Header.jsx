import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  // 模拟用户登录状态
  const isLoggedIn = true;
  const userData = {
    name: "张明",
    avatar: null
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo 区域 */}
          <Link to="/" className="flex items-center">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 w-10 h-10 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">H</span>
            </div>
            <span className="ml-3 text-xl font-bold text-gray-800 hidden md:block">HotelBooking</span>
          </Link>

          {/* 桌面导航 */}
          <nav className="hidden md:flex space-x-8">
            <NavLink 
              to="/home" 
              className={({isActive}) => 
                `flex items-center font-medium transition-colors hover:text-blue-600 ${isActive ? 'text-blue-600' : 'text-gray-700'}`
              }
            >
              首页
            </NavLink>
            <NavLink 
              to="/hotels" 
              className={({isActive}) => 
                `flex items-center font-medium transition-colors hover:text-blue-600 ${isActive ? 'text-blue-600' : 'text-gray-700'}`
              }
            >
              酒店
            </NavLink>
            <NavLink 
              to="/orders" 
              className={({isActive}) => 
                `flex items-center font-medium transition-colors hover:text-blue-600 ${isActive ? 'text-blue-600' : 'text-gray-700'}`
              }
            >
              我的订单
            </NavLink>
          </nav>

          {/* 搜索框 - 桌面版 */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="搜索目的地、酒店或景点"
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* 右侧功能区 */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative">
                <button 
                  onClick={toggleUserMenu}
                  className="flex items-center text-gray-700 hover:text-blue-600"
                >
                  {userData.avatar ? (
                    <img 
                      src={userData.avatar} 
                      alt={userData.name} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-8 h-8 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">{userData.name.charAt(0)}</span>
                    </div>
                  )}
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-20">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-medium">欢迎, {userData.name}</p>
                    </div>
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      个人中心
                    </Link>
                    <Link 
                      to="/orders" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      我的订单
                    </Link>
                    <Link 
                      to="/settings" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      设置
                    </Link>
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50">
                        退出登录
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex space-x-3">
                <Link to="/auth" className="px-4 py-2 text-gray-600 hover:text-blue-600 font-medium">登录</Link>
                <Link to="/auth" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg font-medium hover:opacity-90 transition-opacity">注册</Link>
              </div>
            )}

            {/* 移动端菜单按钮 */}
            <button 
              className="ml-2 md:hidden text-gray-600 hover:text-blue-600 focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <span className="text-xl font-bold">×</span>
              ) : (
                <span className="text-xl">≡</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 移动端菜单 */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          {/* 移动端搜索框 */}
          <div className="px-4 py-3">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索目的地、酒店或景点"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
          </div>
          
          <div className="px-4 py-2">
            <Link 
              to="/" 
              className="block py-3 px-4 text-gray-700 hover:bg-blue-50 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              首页
            </Link>
            <Link 
              to="/hotels" 
              className="block py-3 px-4 text-gray-700 hover:bg-blue-50 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              酒店
            </Link>
            <Link 
              to="/orders" 
              className="block py-3 px-4 text-gray-700 hover:bg-blue-50 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              我的订单
            </Link>
            
            {!isLoggedIn && (
              <div className="mt-4 border-t pt-4">
                <Link 
                  to="/auth" 
                  className="block py-3 px-4 text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                  onClick={() => setIsMenuOpen(false)}
                >
                  登录/注册
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;    