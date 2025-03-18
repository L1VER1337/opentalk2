import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faCrown, faPhoneAlt, faVolumeUp, faTimes, faCheckCircle, faCircle, faMoon, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import '../styles/RightSidebar.css';
import AuthContext from '../context/AuthContext';

const RightSidebar = () => {
  const { user } = useContext(AuthContext);

  // Данные для трендов
  const trends = [
    { id: 1, category: 'Технологии', title: '#ReactJS', posts: '12.7K постов' },
    { id: 2, category: 'Россия', title: '#МосковскийФестиваль', posts: '8.2K постов' },
    { id: 3, category: 'Спорт', title: 'Лига Чемпионов', posts: '32K постов' },
    { id: 4, category: 'Бизнес', title: '#Стартапы', posts: '5.1K постов' },
    { id: 5, category: 'Развлечения', title: '#НовыйСериал', posts: '18.3K постов' }
  ];

  // Данные для рекомендуемых пользователей
  const suggestedUsers = [
    { id: 1, name: 'Елена Соколова', handle: '@elena_design', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 2, name: 'Дмитрий Волков', handle: '@dmitry_tech', avatar: 'https://i.pravatar.cc/150?img=8' },
    { id: 3, name: 'Анна Новикова', handle: '@anna_photo', avatar: 'https://i.pravatar.cc/150?img=9' }
  ];

  // Данные для активных чатов
  const activeChats = [
    { id: 1, name: 'Ирина Васильева', message: 'Привет! Как дела с проектом?', time: '12:45', avatar: 'https://i.pravatar.cc/150?img=15', status: 'online' },
    { id: 2, name: 'Михаил Комаров', message: 'Посмотрел твой пост, круто!', time: '10:30', avatar: 'https://i.pravatar.cc/150?img=31', status: 'online' },
    { id: 3, name: 'Наталья Лебедева', message: 'Выслала тебе материалы', time: 'Вчера', avatar: 'https://i.pravatar.cc/150?img=8', status: 'away' }
  ];

  // Данные для голосовых каналов
  const voiceChannels = [
    { id: 1, name: 'Игровой чат', users: 5 },
    { id: 2, name: 'Музыка', users: 3 },
    { id: 3, name: 'Рабочее пространство', users: 7 }
  ];

  // Функция для получения иконки статуса
  const getStatusIcon = (status) => {
    switch(status) {
      case 'online':
        return <FontAwesomeIcon icon={faCircle} className="status-icon online" />;
      case 'away':
        return <FontAwesomeIcon icon={faMoon} className="status-icon away" />;
      case 'do_not_disturb':
        return <FontAwesomeIcon icon={faExclamationCircle} className="status-icon do_not_disturb" />;
      case 'offline':
      default:
        return <FontAwesomeIcon icon={faCircle} className="status-icon offline" />;
    }
  };

  // Функция для открытия модального окна премиум
  const openPremiumModal = () => {
    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.className = 'premium-modal active';
    modal.id = 'premium-modal';
    
    modal.innerHTML = `
      <div class="premium-container">
        <div class="premium-header">
          <h2>OpenTalk Премиум</h2>
          <button class="close-premium-btn"><i class="fas fa-times"></i></button>
        </div>
        <div class="premium-content">
          <div class="premium-hero">
            <i class="fas fa-crown premium-hero-icon"></i>
            <h3>Улучшите свой опыт с OpenTalk Премиум</h3>
          </div>
          <div class="premium-features">
            <div class="premium-feature">
              <i class="fas fa-check-circle"></i>
              <p>Без рекламы</p>
            </div>
            <div class="premium-feature">
              <i class="fas fa-check-circle"></i>
              <p>Увеличенный лимит сообщений</p>
            </div>
            <div class="premium-feature">
              <i class="fas fa-check-circle"></i>
              <p>HD качество звонков</p>
            </div>
            <div class="premium-feature">
              <i class="fas fa-check-circle"></i>
              <p>Загрузка файлов до 4 ГБ</p>
            </div>
            <div class="premium-feature">
              <i class="fas fa-check-circle"></i>
              <p>Эксклюзивные стикеры</p>
            </div>
            <div class="premium-feature">
              <i class="fas fa-check-circle"></i>
              <p>Приоритетная поддержка</p>
            </div>
          </div>
          <div class="premium-plans">
            <div class="premium-plan">
              <h4>Месячная подписка</h4>
              <p class="plan-price">599 ₽/мес</p>
              <button class="plan-select-btn">Выбрать</button>
            </div>
            <div class="premium-plan best-value">
              <div class="best-value-tag">Выгодно</div>
              <h4>Годовая подписка</h4>
              <p class="plan-price">4990 ₽/год</p>
              <p class="plan-save">Экономия 30%</p>
              <button class="plan-select-btn">Выбрать</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Заменяем стандартные иконки на FontAwesome иконки
    const replaceIcons = () => {
      const checkIcons = modal.querySelectorAll('.premium-feature i.fas.fa-check-circle');
      const closeIcon = modal.querySelector('.close-premium-btn i.fas.fa-times');
      const crownIcon = modal.querySelector('.premium-hero-icon');
      
      // Проходим по всем иконкам и заменяем их на React компоненты
      if (checkIcons.length > 0) {
        checkIcons.forEach(icon => {
          const iconContainer = document.createElement('span');
          iconContainer.className = 'feature-icon';
          icon.parentNode.replaceChild(iconContainer, icon);
          
          // Добавляем SVG для галочки
          iconContainer.innerHTML = `
            <svg aria-hidden="true" focusable="false" data-icon="check-circle" class="svg-inline--fa fa-check-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path>
            </svg>
          `;
        });
      }
      
      if (closeIcon) {
        const iconContainer = document.createElement('span');
        iconContainer.className = 'close-icon';
        closeIcon.parentNode.replaceChild(iconContainer, closeIcon);
        
        // Добавляем SVG для креста
        iconContainer.innerHTML = `
          <svg aria-hidden="true" focusable="false" data-icon="times" class="svg-inline--fa fa-times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
          </svg>
        `;
      }
      
      if (crownIcon) {
        const iconContainer = document.createElement('span');
        iconContainer.className = 'crown-icon';
        crownIcon.parentNode.replaceChild(iconContainer, crownIcon);
        
        // Добавляем SVG для короны
        iconContainer.innerHTML = `
          <svg aria-hidden="true" focusable="false" data-icon="crown" class="svg-inline--fa fa-crown premium-hero-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path fill="currentColor" d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z"></path>
          </svg>
        `;
      }
    };
    
    // Выполняем замену после добавления модального окна в DOM
    setTimeout(replaceIcons, 0);
    
    // Добавляем обработчик для закрытия
    const closeBtn = modal.querySelector('.close-premium-btn');
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      setTimeout(() => {
        document.body.removeChild(modal);
      }, 300);
    });
    
    // Закрытие при клике вне модального окна
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        setTimeout(() => {
          document.body.removeChild(modal);
        }, 300);
      }
    });
  };

  return (
    <div className="right-sidebar">
      {/* Премиум баннер */}
      <div className="premium-banner" onClick={openPremiumModal}>
        <div className="premium-icon">
          <FontAwesomeIcon icon={faCrown} />
        </div>
        <div className="premium-info">
          <h3>OpenTalk Премиум</h3>
          <p>Получите доступ к эксклюзивным функциям</p>
          <button className="premium-btn">Подключить</button>
        </div>
      </div>
      
      {/* Секция трендов */}
      <div className="trends-section">
        <h3>Актуальные темы</h3>
        <div className="trends-list">
          {trends.map(trend => (
            <div key={trend.id} className="trend-item">
              <div className="trend-info">
                <p className="trend-category">{trend.category}</p>
                <p className="trend-title">{trend.title}</p>
                <p className="trend-posts">{trend.posts}</p>
              </div>
              <div className="trend-menu">
                <FontAwesomeIcon icon={faEllipsis} />
              </div>
            </div>
          ))}
          <div className="show-more">
            <a href="#">Показать больше</a>
          </div>
        </div>
      </div>

      {/* Секция рекомендуемых пользователей */}
      <div className="suggested-users">
        <h3>Рекомендуемые пользователи</h3>
        <div className="users-list">
          {suggestedUsers.map(user => (
            <div key={user.id} className="suggested-user">
              <div className="user-avatar">
                <img src={user.avatar} alt={user.name} />
              </div>
              <div className="user-info">
                <p className="user-name">{user.name}</p>
                <p className="user-handle">{user.handle}</p>
              </div>
              <button className="follow-btn">Читать</button>
            </div>
          ))}
          <div className="show-more">
            <a href="#">Показать больше</a>
          </div>
        </div>
      </div>
      
      {/* Активные чаты */}
      <div className="active-chats">
        <h3>Активные чаты</h3>
        <div className="chats-list">
          {activeChats.map(chat => (
            <div key={chat.id} className="chat-item">
              <div className="chat-avatar">
                <img src={chat.avatar} alt={chat.name} />
                <span className={`status ${chat.status}`}></span>
              </div>
              <div className="chat-info">
                <p className="chat-name">
                  {chat.name}
                  {getStatusIcon(chat.status)}
                </p>
                <p className="last-message">{chat.message}</p>
              </div>
              <div className="chat-actions">
                <button className="chat-action-btn">
                  <FontAwesomeIcon icon={faPhoneAlt} />
                </button>
                <div className="chat-time">{chat.time}</div>
              </div>
            </div>
          ))}
          <div className="show-more">
            <a href="#">Все сообщения</a>
          </div>
        </div>
      </div>
      
      {/* Голосовые каналы */}
      <div className="voice-channels">
        <h3>Голосовые каналы</h3>
        <div className="voice-channels-list">
          {voiceChannels.map(channel => (
            <div key={channel.id} className="voice-channel-item">
              <div className="voice-channel-info">
                <FontAwesomeIcon icon={faVolumeUp} />
                <div className="voice-channel-details">
                  <p className="voice-channel-name">{channel.name}</p>
                  <p className="voice-channel-count">{channel.users} участников</p>
                </div>
              </div>
              <button className="join-voice-btn">Войти</button>
            </div>
          ))}
          <div className="show-more">
            <a href="#">Все каналы</a>
          </div>
        </div>
      </div>

      {/* Футер */}
      <div className="sidebar-footer">
        <div className="footer-links">
          <a href="#">Условия использования</a>
          <a href="#">Политика конфиденциальности</a>
          <a href="#">Правила сообщества</a>
          <a href="#">О нас</a>
          <a href="#">Помощь</a>
        </div>
        <p className="copyright">© 2025 OpenTalk</p>
      </div>
    </div>
  );
};

export default RightSidebar;