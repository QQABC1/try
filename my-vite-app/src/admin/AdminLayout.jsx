import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* 侧边栏 */}
      <aside className="w-64 bg-white shadow-md fixed inset-y-0 left-0 z-20 border-r border-gray-200">
        {/* 品牌标识 */}
        <div className="p-5 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">酒店管理系统</h1>
        </div>
        
        {/* 导航菜单 */}
        <nav className="mt-4">
          <Link 
            to="/admin" 
            className="block py-3 px-5 text-gray-900 font-medium bg-blue-50 border-l-4 border-blue-500"
          >
            仪表盘
          </Link>
          
          <Link 
            to="/admin/rooms" 
            className="block py-3 px-5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
          >
            房态管理
          </Link>
          
          <Link 
            to="/admin/orders" 
            className="block py-3 px-5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
          >
            订单管理
          </Link>
          
          <Link 
            to="/admin/users" 
            className="block py-3 px-5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
          >
            用户管理
          </Link>
          
          <Link 
            to="/admin/analytics" 
            className="block py-3 px-5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
          >
            数据分析
          </Link>
        </nav>
        
        {/* 底部退出按钮 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button className="w-full py-2 px-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 text-sm font-medium">
            退出登录
          </button>
        </div>
      </aside>
      
      {/* 主内容区 */}
      <main className="flex-1 ml-64">
        {/* 顶部导航栏 */}
        <header className="bg-white shadow-sm fixed top-0 right-0 left-64 z-10">
          <div className="flex items-center justify-between p-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">仪表盘</h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-500 hover:text-gray-700">
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                <span className="text-xs text-red-500">2</span>
              </button>
              
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                  <span className="text-gray-600 font-medium">管</span>
                </div>
                <span className="text-gray-700 font-medium">管理员</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* 内容区域 */}
        <div className="pt-16 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;  