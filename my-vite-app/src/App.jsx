import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

// 公共组件
import Header from './components/Header';
import Footer from './components/Footer';

// 页面组件
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import HotelListPage from './pages/HotelListPage';
import HotelDetailPage from './pages/HotelDetailPage';
import BookingPage from './pages/BookingPage';
import UserProfilePage from './pages/UserProfilePage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import WriteReviewPage from './pages/WriteReviewPage';

// 管理后台页面
import AdminLayout from './admin/AdminLayout';
import DashboardPage from './admin/DashboardPage';
import RoomManagementPage from './admin/RoomManagementPage';
import OrderManagementPage from './admin/OrderManagementPage';
import UserManagementPage from './admin/UserManagementPage';
import AnalyticsPage from './admin/AnalyticsPage';

// 主布局组件
const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

// 路由配置
const router = createBrowserRouter([
  {
    // 根路径重定向到登录页
    path: "/",
    element: <Navigate to="/auth" replace />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/home",  // 主页路径改为/home
        element: <HomePage />,
      },
      {
        path: "/hotels",
        element: <HotelListPage />,
      },
      {
        path: "/hotel/:id",
        element: <HotelDetailPage />,
      },
      {
        path: "/booking/:hotelId/:roomId",
        element: <BookingPage />,
      },
      {
        path: "/profile",
        element: <UserProfilePage />,
      },
      {
        path: "/orders",
        element: <OrderHistoryPage />,
      },
      {
        path: "/review/:orderId",
        element: <WriteReviewPage />,
      },
    ]
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: <DashboardPage />,
      },
      {
        path: "/admin/rooms",
        element: <RoomManagementPage />,
      },
      {
        path: "/admin/orders",
        element: <OrderManagementPage />,
      },
      {
        path: "/admin/users",
        element: <UserManagementPage />,
      },
      {
        path: "/admin/analytics",
        element: <AnalyticsPage />,
      },
    ]
  },
]);

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;