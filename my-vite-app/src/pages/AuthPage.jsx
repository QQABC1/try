import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const endpoint = isLogin ? 'http://localhost:3000/api/auth/login' : 'http://localhost:3000/api/auth/register';
    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : formData;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    
    if (response.ok) {
      // 登录/注册成功处理
      localStorage.setItem('authToken', data.token);
      // 跳转页面或更新全局状态
  
      // 通过 isLogin 状态判断是注册还是登录
      if (isLogin) {
        navigate("/home"); // 登录后返回首页
      } else {
       alert('注册成功！');
      }
    } else {
      // 处理错误（显示错误提示）
      console.log('处理失败');
    }
  } catch (error) {
    console.error('请求失败:', error);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
      {/* 装饰元素 */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full filter blur-3xl opacity-60 transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-100 rounded-full filter blur-3xl opacity-60 transform -translate-x-1/3 translate-y-1/3"></div>

      <div className="container max-w-6xl mx-auto flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        {/* 左侧信息面板 - 仅在大屏幕显示 */}
        <div className="hidden md:flex md:w-1/2 md:pr-12 lg:pr-16">
          <div className="bg-gradient-to-br from-primary to-indigo-600 rounded-2xl p-8 shadow-2xl text-white transform transition-all duration-500 hover:scale-[1.01]">
            <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold mb-4">欢迎回来</h2>
            <p className="text-blue-100 mb-6 text-lg">
              {isLogin ? '登录您的账户，探索更多精彩酒店' : '创建新账户，开启您的旅行计划'}
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-blue-200" />
                <span>全天候客户支持</span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faLock} className="mr-3 text-blue-200" />
                <span>安全可靠的支付系统</span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faUser} className="mr-3 text-blue-200" />
                <span>个性化推荐服务</span>
              </li>
            </ul>
            <div className="mt-8">
              <img 
                src="https://picsum.photos/id/1039/600/400" 
                alt="酒店风景" 
                className="rounded-lg shadow-lg transform transition-all duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>

        {/* 右侧表单面板 */}
        <div className="w-full md:w-1/2 max-w-md">
          <div className="bg-white rounded-2xl shadow-card p-8 md:p-10 transform transition-all duration-500 hover:shadow-xl">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <h1 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-neutral-700">
                  {isLogin ? '登录账户' : '创建账户'}
                </h1>
                <div className="absolute bottom-0 left-0 w-1/3 h-1 bg-primary rounded-full"></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faUser} className="text-neutral-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="姓名"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 shadow-input"
                  />
                </div>
              )}

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faEnvelope} className="text-neutral-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="邮箱地址"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 shadow-input"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faLock} className="text-neutral-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="密码"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 shadow-input"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-indigo-600 text-white py-3 px-4 rounded-xl font-medium transform transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 active:translate-y-0"
              >
                {isLogin ? '登录' : '注册'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-neutral-500">
                {isLogin ? '还没有账户? ' : '已有账户? '}
                <button
                  className="text-primary font-medium hover:text-primary/80 transition-colors duration-300"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? '立即注册' : '返回登录'}
                </button>
              </p>
            </div>

            {/* 分隔线 */}
            <div className="my-6 flex items-center">
              <div className="flex-grow h-px bg-neutral-200"></div>
              <span className="px-4 text-neutral-400 text-sm">或通过以下方式登录</span>
              <div className="flex-grow h-px bg-neutral-200"></div>
            </div>

            {/* 社交登录按钮 */}
            <div className="grid grid-cols-3 gap-4">
              <button className="flex items-center justify-center py-2 border border-neutral-200 rounded-xl transition-all duration-300 hover:bg-neutral-50 hover:border-neutral-300">
                <FontAwesomeIcon icon={['fab', 'google']} className="text-neutral-600" />
              </button>
              <button className="flex items-center justify-center py-2 border border-neutral-200 rounded-xl transition-all duration-300 hover:bg-neutral-50 hover:border-neutral-300">
                <FontAwesomeIcon icon={['fab', 'facebook']} className="text-neutral-600" />
              </button>
              <button className="flex items-center justify-center py-2 border border-neutral-200 rounded-xl transition-all duration-300 hover:bg-neutral-50 hover:border-neutral-300">
                <FontAwesomeIcon icon={['fab', 'twitter']} className="text-neutral-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="py-6 text-center text-neutral-400 text-sm">
        <p>© 2025 酒店预订系统. 保留所有权利.</p>
      </footer>
    </div>
  );
};

export default AuthPage;    