import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faEnvelope, faMapMarkerAlt, faLink, faInfo, faImage, faSave
} from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../context/AuthContext';
import '../../styles/Settings.css';

const ProfileSettings = () => {
  const { user, updateProfile, error: authError } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    location: '',
    website: '',
    bio: '',
    avatar: null,
    cover_image: null
  });
  
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [previewCover, setPreviewCover] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState('');
  const [localSuccess, setLocalSuccess] = useState('');
  
  // Заполняем форму данными пользователя при загрузке компонента
  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        email: user.email || '',
        location: user.location || '',
        website: user.website || '',
        bio: user.bio || ''
      });
      
      if (user.avatar) {
        setPreviewAvatar(user.avatar);
      }
      
      if (user.cover_image) {
        setPreviewCover(user.cover_image);
      }
    }
  }, [user]);
  
  useEffect(() => {
    // Сбросить горизонтальную прокрутку при монтировании компонента
    window.scrollTo(0, 0);
    
    // Добавить класс для предотвращения прокрутки вправо
    document.body.classList.add('settings-page');

    // Фиксим потенциальные проблемы со скроллом
    document.querySelector('.main-content').scrollTop = 0;
    
    // Очистка при размонтировании
    return () => {
      document.body.classList.remove('settings-page');
    };
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
      
      // Предпросмотр изображения
      const reader = new FileReader();
      reader.onloadend = () => {
        if (name === 'avatar') {
          setPreviewAvatar(reader.result);
        } else if (name === 'cover_image') {
          setPreviewCover(reader.result);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setLocalSuccess('');
    setIsSubmitting(true);
    
    try {
      // Создаем FormData для отправки файлов
      const formDataToSend = new FormData();
      
      for (const key in formData) {
        if (formData[key] !== null && formData[key] !== undefined) {
          formDataToSend.append(key, formData[key]);
        }
      }
      
      const success = await updateProfile(formDataToSend);
      
      if (success) {
        setLocalSuccess('Профиль успешно обновлен');
        // После небольшой задержки очищаем сообщение об успехе
        setTimeout(() => {
          setLocalSuccess('');
        }, 3000);
      }
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
      setLocalError('Произошла ошибка при обновлении профиля');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = () => {
    navigate('/profile');
  };
  
  if (!user) {
    return (
      <div className="settings-container loading">
        <div className="loading-spinner"></div>
        <p>Загрузка...</p>
      </div>
    );
  }
  
  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Настройки профиля</h1>
        <p>Обновите свою информацию и персонализируйте профиль</p>
      </div>
      
      {(localError || authError) && (
        <div className="settings-error">
          {localError || authError}
        </div>
      )}
      
      {localSuccess && (
        <div className="settings-success">
          {localSuccess}
        </div>
      )}
      
      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="settings-section">
          <h2>Личная информация</h2>
          
          <div className="form-group">
            <label htmlFor="full_name">
              <FontAwesomeIcon icon={faUser} /> Полное имя
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="Ваше полное имя"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} /> Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="Ваш email"
              readOnly
            />
            <p className="field-note">Email нельзя изменить</p>
          </div>
          
          <div className="form-group">
            <label htmlFor="location">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> Местоположение
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="Ваше местоположение (необязательно)"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="website">
              <FontAwesomeIcon icon={faLink} /> Сайт
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="Ваш сайт (необязательно)"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="bio">
              <FontAwesomeIcon icon={faInfo} /> О себе
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="Расскажите о себе (необязательно)"
              rows={4}
            ></textarea>
          </div>
        </div>
        
        <div className="settings-section">
          <h2>Изображения профиля</h2>
          
          <div className="form-group">
            <label htmlFor="avatar">
              <FontAwesomeIcon icon={faImage} /> Аватар
            </label>
            
            {previewAvatar && (
              <div className="image-preview avatar-preview">
                <img src={previewAvatar} alt="Аватар" />
              </div>
            )}
            
            <input
              type="file"
              id="avatar"
              name="avatar"
              onChange={handleFileChange}
              disabled={isSubmitting}
              accept="image/*"
              className="file-input"
            />
            <label htmlFor="avatar" className="file-label">
              Выберите изображение
            </label>
          </div>
          
          <div className="form-group">
            <label htmlFor="cover_image">
              <FontAwesomeIcon icon={faImage} /> Обложка профиля
            </label>
            
            {previewCover && (
              <div className="image-preview cover-preview">
                <img src={previewCover} alt="Обложка профиля" />
              </div>
            )}
            
            <input
              type="file"
              id="cover_image"
              name="cover_image"
              onChange={handleFileChange}
              disabled={isSubmitting}
              accept="image/*"
              className="file-input"
            />
            <label htmlFor="cover_image" className="file-label">
              Выберите изображение
            </label>
          </div>
        </div>
        
        <div className="settings-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Отмена
          </button>
          
          <button
            type="submit"
            className="save-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-icon"></span>
                Сохранение...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faSave} />
                Сохранить
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings; 