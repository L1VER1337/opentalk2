import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
  login: () => {},
  register: () => {},
  logout: () => {},
  updateProfile: () => {},
  updateStatus: () => {},
  getAuthToken: () => {}
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Базовый API URL
  const API_URL = 'http://localhost:8000/api';

  // При загрузке проверяем токен в localStorage
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Запрос к API для получения данных пользователя
        const response = await fetch(`${API_URL}/users/me/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setIsAuthenticated(true);
        } else if (response.status === 401) {
          // Если токен недействителен, пробуем обновить через refresh token
          const refreshToken = localStorage.getItem('refreshToken');
          
          if (refreshToken) {
            try {
              const refreshResponse = await fetch(`${API_URL}/auth/refresh/`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refresh: refreshToken })
              });
              
              if (refreshResponse.ok) {
                const refreshData = await refreshResponse.json();
                // Сохраняем новый access token
                localStorage.setItem('token', refreshData.access);
                
                // Пробуем снова получить данные пользователя
                const newUserResponse = await fetch(`${API_URL}/users/me/`, {
                  headers: {
                    'Authorization': `Bearer ${refreshData.access}`
                  }
                });
                
                if (newUserResponse.ok) {
                  const newUserData = await newUserResponse.json();
                  setUser(newUserData);
                  setIsAuthenticated(true);
                } else {
                  throw new Error('Не удалось получить данные пользователя после обновления токена');
                }
              } else {
                // Если refresh token тоже недействителен, очищаем localStorage
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                setIsAuthenticated(false);
                setUser(null);
              }
            } catch (refreshError) {
              console.error('Ошибка обновления токена:', refreshError);
              localStorage.removeItem('token');
              localStorage.removeItem('refreshToken');
              setIsAuthenticated(false);
              setUser(null);
            }
          } else {
            // Если нет refresh token, просто очищаем localStorage
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            setUser(null);
          }
        } else {
          // Неизвестная ошибка, очищаем localStorage
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Ошибка аутентификации:', error);
        setError('Ошибка при проверке аутентификации');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Получение токена аутентификации
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  // Функция для входа в систему
  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Сохраняем токены
        localStorage.setItem('token', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        
        // Используем данные пользователя, возвращенные с сервера
        setUser(data); // Здесь мы устанавливаем данные пользователя
        setIsAuthenticated(true);
        return true;
      } else {
        setError(data.detail || 'Ошибка входа в систему');
        return false;
      }
    } catch (error) {
      console.error('Ошибка входа:', error);
      setError('Ошибка сервера. Попробуйте позже.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Функция для регистрации
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/auth/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok) {
        // Сохраняем токены
        localStorage.setItem('token', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        
        // Устанавливаем данные пользователя
        setUser(data.user);
        setIsAuthenticated(true);
        return true;
      } else {
        // Обработка ошибок валидации
        if (data.username) {
          setError(`Ошибка имени пользователя: ${data.username.join(', ')}`);
        } else if (data.email) {
          setError(`Ошибка email: ${data.email.join(', ')}`);
        } else if (data.password) {
          setError(`Ошибка пароля: ${data.password.join(', ')}`);
        } else if (data.password2) {
          setError(`Ошибка подтверждения пароля: ${data.password2.join(', ')}`);
        } else if (data.detail) {
          setError(data.detail);
        } else {
          setError('Ошибка регистрации. Пожалуйста, проверьте введенные данные.');
        }
        return false;
      }
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      setError('Ошибка сервера. Попробуйте позже.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Функция для выхода
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
    setUser(null);
  };

  // Функция для обновления профиля
  const updateProfile = async (profileData) => {
    setLoading(true);
    setError(null);
    
    try {
      const token = getAuthToken();
      
      // Проверяем, является ли profileData экземпляром FormData
      const isFormData = profileData instanceof FormData;
      
      // Устанавливаем заголовки в зависимости от типа данных
      const headers = {
        'Authorization': `Bearer ${token}`
      };
      
      if (!isFormData) {
        headers['Content-Type'] = 'application/json';
      }
      
      const response = await fetch(`${API_URL}/users/update_me/`, {
        method: 'PUT',
        headers: headers,
        body: isFormData ? profileData : JSON.stringify(profileData)
      });

      const data = await response.json();

      if (response.ok) {
        setUser({...user, ...data});
        return true;
      } else {
        if (data.detail) {
          setError(data.detail);
        } else {
          // Проверяем наличие ошибок валидации
          const errorMessages = [];
          for (const field in data) {
            if (Array.isArray(data[field])) {
              errorMessages.push(`${field}: ${data[field].join(', ')}`);
            }
          }
          
          if (errorMessages.length > 0) {
            setError(errorMessages.join('\n'));
          } else {
            setError('Ошибка обновления профиля');
          }
        }
        return false;
      }
    } catch (error) {
      console.error('Ошибка обновления профиля:', error);
      setError('Ошибка сервера. Попробуйте позже.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Функция для обновления статуса пользователя
  const updateStatus = async (status) => {
    setLoading(true);
    setError(null);
    
    try {
      const token = getAuthToken();
      
      const response = await fetch(`${API_URL}/users/update_status/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });

      const data = await response.json();

      if (response.ok) {
        // Обновляем локальные данные пользователя с новым статусом
        setUser({...user, status});
        return true;
      } else {
        if (data.detail) {
          setError(data.detail);
        } else {
          setError('Ошибка обновления статуса');
        }
        return false;
      }
    } catch (error) {
      console.error('Ошибка обновления статуса:', error);
      setError('Ошибка сервера. Попробуйте позже.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    updateStatus,
    getAuthToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 