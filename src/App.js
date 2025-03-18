import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import Feed from './components/Feed';
import RightSidebar from './components/RightSidebar';
import ThemeContext from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import AuthContext from './context/AuthContext';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ResetPassword from './pages/auth/ResetPassword';
import Profile from './pages/profile/Profile';
import ProfileSettings from './pages/settings/ProfileSettings';
import './styles/App.css';

// Компонент для защищенных маршрутов
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const location = useLocation();

  // Показываем индикатор загрузки, пока проверяем токен
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Загрузка...</p>
      </div>
    );
  }

  // Если пользователь не авторизован, перенаправляем на страницу входа
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Если авторизован, показываем запрошенный контент
  return children;
};

// Компонент для маршрутов аутентификации (если пользователь уже авторизован, перенаправляем на главную)
const AuthRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Загрузка...</p>
      </div>
    );
  }
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Основной макет с боковыми панелями
const MainLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <TopNav />
        {children}
      </div>
      <RightSidebar />
    </div>
  );
};

function App() {
  const [theme, setTheme] = useState('light-theme');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
      setTheme('dark-theme');
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    } else {
      setTheme('light-theme');
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark-theme') {
      setTheme('light-theme');
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    } else {
      setTheme('dark-theme');
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Маршруты аутентификации */}
            <Route path="/auth/login" element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            } />
            <Route path="/auth/register" element={
              <AuthRoute>
                <Register />
              </AuthRoute>
            } />
            <Route path="/auth/reset-password" element={
              <AuthRoute>
                <ResetPassword />
              </AuthRoute>
            } />
            
            {/* Защищенные маршруты */}
            <Route path="/" element={
              <ProtectedRoute>
                <MainLayout>
                  <Feed />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <MainLayout>
                  <Profile />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/profile/:username" element={
              <ProtectedRoute>
                <MainLayout>
                  <Profile />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/settings/profile" element={
              <ProtectedRoute>
                <MainLayout>
                  <ProfileSettings />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            {/* Другие маршруты можно добавлять по мере необходимости */}
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeContext.Provider>
  );
}

export default App; 