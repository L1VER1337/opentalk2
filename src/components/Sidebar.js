import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faSearch, faBell, faEnvelope, faPhone, faVideo, 
  faMusic, faBrain, faUser, faCrown, faMoon, faSun, faBook,
  faCircle, faDotCircle, faMoon as faMoonSolid, faTimes, faCog
} from '@fortawesome/free-solid-svg-icons';
import ThemeContext from '../context/ThemeContext';
import AuthContext from '../context/AuthContext';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, updateStatus } = useContext(AuthContext);
  const isDarkTheme = theme === 'dark-theme';
  
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(user?.status || 'offline');
  
  // Функция открытия/закрытия модального окна статуса
  const toggleStatusModal = () => {
    // Если текущий статус 'away', автоматически меняем его на 'online'
    if (currentStatus === 'away' && !statusModalOpen) {
      changeStatus('online');
    }
    setStatusModalOpen(!statusModalOpen);
  };
  
  // Функция изменения статуса пользователя
  const changeStatus = async (newStatus) => {
    try {
      const success = await updateStatus(newStatus);
      if (success) {
        setCurrentStatus(newStatus);
        setStatusModalOpen(false);
      }
    } catch (error) {
      console.error('Ошибка при изменении статуса:', error);
    }
  };
  
  // Получение иконки и текста статуса
  const getStatusInfo = (status) => {
    switch (status) {
      case 'online':
        return { icon: faCircle, color: 'var(--light-success)', text: 'В сети' };
      case 'away':
        return { icon: faDotCircle, color: 'var(--light-warning)', text: 'Отошел' };
      case 'do_not_disturb':
        return { icon: faMoonSolid, color: 'var(--light-danger)', text: 'Не беспокоить' };
      case 'offline':
      default:
        return { icon: faCircle, color: 'var(--light-text-secondary)', text: 'Не в сети' };
    }
  };
  
  const statusInfo = getStatusInfo(currentStatus);

  return (
    <div className="sidebar">
      <div className="logo">
        <h1>OpenTalk</h1>
      </div>
      <div className="sidebar-menu">
        <Link to="/" className="menu-item active">
          <FontAwesomeIcon icon={faHome} />
          <span>Главная</span>
        </Link>
        <div className="menu-item">
          <FontAwesomeIcon icon={faSearch} />
          <span>Поиск</span>
        </div>
        <div className="menu-item">
          <FontAwesomeIcon icon={faBell} />
          <span>Уведомления</span>
        </div>
        <div className="menu-item">
          <FontAwesomeIcon icon={faEnvelope} />
          <span>Сообщения</span>
        </div>
        <div className="menu-item">
          <FontAwesomeIcon icon={faPhone} />
          <span>Звонки</span>
        </div>
        <div className="menu-item">
          <FontAwesomeIcon icon={faVideo} />
          <span>Конференции</span>
        </div>
        <div className="menu-item">
          <FontAwesomeIcon icon={faMusic} />
          <span>Музыка</span>
        </div>
        <div className="menu-item">
          <FontAwesomeIcon icon={faBrain} />
          <span>ИИ</span>
        </div>
        <div className="menu-item">
          <FontAwesomeIcon icon={faBook} />
          <span>Саморазвитие</span>
        </div>
        <Link to="/profile" className="menu-item">
          <FontAwesomeIcon icon={faUser} />
          <span>Профиль</span>
        </Link>
        <div className="menu-item premium-menu-item">
          <FontAwesomeIcon icon={faCrown} />
          <span>Премиум</span>
        </div>
      </div>
      <div className="theme-toggle">
        <button onClick={toggleTheme} id="theme-toggle-btn">
          <FontAwesomeIcon icon={isDarkTheme ? faSun : faMoon} />
          <span>{isDarkTheme ? 'Светлая тема' : 'Тёмная тема'}</span>
          <div className="toggle-switch"></div>
        </button>
      </div>
      <div className="user-profile" onClick={toggleStatusModal}>
        <div className="avatar">
          <img src={user?.avatar || "https://i.pravatar.cc/150?img=12"} alt="Аватар пользователя" />
          <span className={`status ${currentStatus}`}></span>
        </div>
        <div className="user-info">
          <p className="username">{user?.full_name || "Пользователь"}</p>
          <p className="user-status">
            <FontAwesomeIcon 
              icon={statusInfo.icon} 
              style={{ color: statusInfo.color, fontSize: '0.7rem', marginRight: '5px' }} 
            />
            {statusInfo.text}
          </p>
        </div>
      </div>
      
      {/* Модальное окно изменения статуса */}
      {statusModalOpen && (
        <div className="status-modal">
          <div className="status-modal-header">
            <h3>Изменить статус</h3>
            <button className="close-btn" onClick={toggleStatusModal}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <div className="status-options">
            <div 
              className={`status-option ${currentStatus === 'online' ? 'active' : ''}`}
              onClick={() => changeStatus('online')}
            >
              <FontAwesomeIcon 
                icon={faCircle} 
                style={{ color: 'var(--light-success)' }} 
              />
              <span>В сети</span>
            </div>
            <div 
              className={`status-option ${currentStatus === 'do_not_disturb' ? 'active' : ''}`}
              onClick={() => changeStatus('do_not_disturb')}
            >
              <FontAwesomeIcon 
                icon={faMoonSolid} 
                style={{ color: 'var(--light-danger)' }} 
              />
              <span>Не беспокоить</span>
            </div>
            <div 
              className={`status-option ${currentStatus === 'offline' ? 'active' : ''}`}
              onClick={() => changeStatus('offline')}
            >
              <FontAwesomeIcon 
                icon={faCircle} 
                style={{ color: 'var(--light-text-secondary)' }} 
              />
              <span>Не в сети</span>
            </div>
          </div>
          <div className="status-modal-footer">
            <Link to="/settings/profile" className="edit-profile-link">
              <FontAwesomeIcon icon={faCog} />
              <span>Редактировать<br />профиль</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar; 