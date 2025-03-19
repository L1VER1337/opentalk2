import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCrown, faArrowRight, faUsers, faBookmark, faCalendarAlt 
} from '@fortawesome/free-solid-svg-icons';
import '../styles/RightSidebar.css';
import AuthContext from '../context/AuthContext';

const RightSidebar = () => {
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
              <p class="plan-price">199 ₽/мес</p>
              <button class="plan-select-btn">Выбрать</button>
            </div>
            <div class="premium-plan best-value">
              <div class="best-value-tag">Выгодно</div>
              <h4>Годовая подписка</h4>
              <p class="plan-price">1990 ₽/год</p>
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
      {/* Премиум секция */}
      <div className="premium-section">
        <div className="premium-card">
          <div className="premium-card-title">
            <FontAwesomeIcon icon={faCrown} />
            <span>OpenTalk Премиум</span>
          </div>
          <div className="premium-card-content">
            Откройте расширенные возможности и устраните ограничения с премиум-подпиской
          </div>
          <button className="premium-card-btn" onClick={openPremiumModal}>
            Активировать <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>

      {/* Секция контактов или другие элементы */}
      <div className="section-title">Популярные сообщества</div>
      <div className="community-list">
        <div className="community-item">
          <div className="community-icon">
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <div className="community-info">
            <div className="community-name">Технологии</div>
            <div className="community-meta">1.2K участников</div>
          </div>
        </div>
        <div className="community-item">
          <div className="community-icon">
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <div className="community-info">
            <div className="community-name">Дизайн и искусство</div>
            <div className="community-meta">945 участников</div>
          </div>
        </div>
      </div>

      {/* Закладки */}
      <div className="section-title">Мои закладки</div>
      <div className="bookmarks-list">
        <div className="bookmark-item">
          <div className="bookmark-icon">
            <FontAwesomeIcon icon={faBookmark} />
          </div>
          <div className="bookmark-info">
            <div className="bookmark-name">Интересные новости</div>
            <div className="bookmark-meta">5 публикаций</div>
          </div>
        </div>
      </div>

      {/* Предстоящие события */}
      <div className="section-title">Предстоящие события</div>
      <div className="events-list">
        <div className="event-item">
          <div className="event-icon">
            <FontAwesomeIcon icon={faCalendarAlt} />
          </div>
          <div className="event-info">
            <div className="event-name">Встреча разработчиков</div>
            <div className="event-meta">27 ноября, 19:00</div>
          </div>
        </div>
      </div>

      {/* Дополнительные разделы можно добавлять по необходимости */}
    </div>
  );
};

export default RightSidebar;