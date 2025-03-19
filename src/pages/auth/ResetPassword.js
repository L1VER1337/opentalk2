import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, faArrowLeft, faSun, faMoon 
} from '@fortawesome/free-solid-svg-icons';
import '../../styles/AuthPages.css';

// Компонент переключателя темы
const ThemeSwitcher = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  
  useEffect(() => {
    // Проверяем текущую тему при монтировании компонента
    const darkModePreferred = localStorage.getItem('darkMode') === 'true';
    setIsDarkTheme(darkModePreferred);
    
    if (darkModePreferred) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, []);
  
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    
    if (!isDarkTheme) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('darkMode', 'false');
    }
  };
  
  return (
    <div className="theme-switcher">
      <div className="theme-title">Тема:</div>
      <div className="theme-label">
        <FontAwesomeIcon icon={faSun} />
      </div>
      <label className="theme-toggle">
        <input 
          type="checkbox" 
          checked={isDarkTheme} 
          onChange={toggleTheme} 
        />
        <span className="toggle-slider"></span>
      </label>
      <div className="theme-label">
        <FontAwesomeIcon icon={faMoon} />
      </div>
    </div>
  );
};

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Пожалуйста, введите ваш email');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Здесь будет вызов API для сброса пароля
      // Имитируем API-вызов с задержкой
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
      setError('Произошла ошибка при отправке запроса. Пожалуйста, попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="auth-container">
      <div className="bg-circle bg-circle-1"></div>
      <div className="bg-circle bg-circle-2"></div>
      <div className="bg-circle bg-circle-3"></div>
      <div className="wave"></div>
      <div className="auth-card">
        <div className="auth-logo">
          <h1>OpenTalk</h1>
        </div>
        <ThemeSwitcher />
        
        {!isSubmitted ? (
          <>
            <h2 className="auth-title">Восстановление пароля</h2>
            <p className="auth-description">
              Введите email, указанный при регистрации, и мы отправим вам инструкции по сбросу пароля.
            </p>
            
            {error && <div className="auth-error">{error}</div>}
            
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="input-icon-wrapper">
                  <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    placeholder="Ваш email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              
              <button 
                type="submit" 
                className="auth-submit-btn" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Отправка...' : 'Отправить инструкции'}
              </button>
            </form>
            
            <Link to="/auth/login" className="back-link">
              <FontAwesomeIcon icon={faArrowLeft} />
              Вернуться к странице входа
            </Link>
          </>
        ) : (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Проверьте свою почту</h2>
            <p>
              Мы отправили инструкции по сбросу пароля на <strong>{email}</strong>. 
              Если вы не получили письмо, проверьте папку "Спам" или попробуйте снова.
            </p>
            <Link to="/auth/login" className="auth-submit-btn">
              Вернуться к входу
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword; 