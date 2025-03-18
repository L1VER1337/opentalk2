import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, faBell, faEnvelope, faPhone, faPlus 
} from '@fortawesome/free-solid-svg-icons';
import '../styles/TopNav.css';

const TopNav = () => {
  return (
    <div className="top-nav">
      <div className="search-container">
        <FontAwesomeIcon icon={faSearch} />
        <input type="text" placeholder="Поиск в OpenTalk..." />
      </div>
      <div className="nav-actions">
        <button className="btn-icon">
          <FontAwesomeIcon icon={faBell} />
          <span className="notification-badge">3</span>
        </button>
        <button className="btn-icon">
          <FontAwesomeIcon icon={faEnvelope} />
          <span className="notification-badge">5</span>
        </button>
        <button className="btn-icon" id="call-btn">
          <FontAwesomeIcon icon={faPhone} />
        </button>
        <button className="new-post-btn">
          <FontAwesomeIcon icon={faPlus} />
          <span>Новый пост</span>
        </button>
      </div>
    </div>
  );
};

export default TopNav; 