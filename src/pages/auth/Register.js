import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, faEnvelope, faLock, faEye, faEyeSlash, 
  faCheckCircle, faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../context/AuthContext';
import '../../styles/AuthPages.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [askForFullName, setAskForFullName] = useState(false);
  const [fullName, setFullName] = useState('');
  
  const { register, error: authError, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очищаем ошибку валидации при изменении поля
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Упрощенная проверка надежности пароля
  const validatePassword = (password) => {
    const isLengthValid = password.length >= 8;
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    
    return {
      isLengthValid,
      hasLetters,
      hasNumbers,
      isValid: isLengthValid && hasLetters && hasNumbers
    };
  };
  
  const passwordStrength = validatePassword(formData.password);
  
  const validateForm = () => {
    const errors = {};
    let isValid = true;
    
    // Валидация имени пользователя
    if (!formData.username.trim()) {
      errors.username = 'Введите имя пользователя';
      isValid = false;
    } else if (formData.username.length < 3) {
      errors.username = 'Имя пользователя должно содержать не менее 3 символов';
      isValid = false;
    }
    
    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Введите email';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Введите корректный email';
      isValid = false;
    }
    
    // Валидация пароля
    if (!formData.password) {
      errors.password = 'Введите пароль';
      isValid = false;
    } else if (!passwordStrength.isValid) {
      errors.password = 'Пароль должен содержать минимум 8 символов, буквы и цифры';
      isValid = false;
    }
    
    // Подтверждение пароля
    if (formData.password !== formData.password2) {
      errors.password2 = 'Пароли не совпадают';
      isValid = false;
    }
    
    setValidationErrors(errors);
    return isValid;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Подготавливаем данные для отправки
      const registrationData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        password2: formData.password2
      };
      
      const success = await register(registrationData);
      
      if (success) {
        // После успешной регистрации спрашиваем про полное имя
        setAskForFullName(true);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      setLocalError('Произошла ошибка при регистрации. Пожалуйста, попробуйте позже.');
      setIsSubmitting(false);
    }
  };
  
  const handleFullNameSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (fullName.trim()) {
        await updateProfile({ full_name: fullName });
      }
      navigate('/');
    } catch (error) {
      console.error('Ошибка обновления профиля:', error);
      // Даже если обновление не удалось, все равно перенаправляем на главную
      navigate('/');
    }
  };
  
  const skipFullNameUpdate = () => {
    navigate('/');
  };
  
  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };
  
  // Если пользователь уже зарегистрировался, показываем форму для добавления полного имени
  if (askForFullName) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-logo">
            <h1>OpenTalk</h1>
          </div>
          <h2 className="auth-title">Добро пожаловать!</h2>
          <p className="auth-description">
            Хотите указать своё полное имя или оставить никнейм?
          </p>
          
          <form className="auth-form" onSubmit={handleFullNameSubmit}>
            <div className="form-group">
              <div className="input-icon-wrapper">
                <FontAwesomeIcon icon={faUser} className="input-icon" />
                <input
                  type="text"
                  id="fullName"
                  placeholder="Ваше полное имя (необязательно)"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              className="auth-submit-btn" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Сохранение...' : 'Сохранить и продолжить'}
            </button>
            
            <button 
              type="button"
              className="auth-secondary-btn"
              onClick={skipFullNameUpdate}
              disabled={isSubmitting}
            >
              Оставить никнейм
            </button>
          </form>
        </div>
      </div>
    );
  }
  
  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <div className="auth-logo">
          <h1>OpenTalk</h1>
        </div>
        <h2 className="auth-title">Создание аккаунта</h2>
        
        {(localError || authError) && (
          <div className="auth-error">
            {localError || authError}
          </div>
        )}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-icon-wrapper">
              <FontAwesomeIcon icon={faUser} className="input-icon" />
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Имя пользователя"
                value={formData.username}
                onChange={handleChange}
                disabled={isSubmitting}
                className={validationErrors.username ? 'error' : ''}
              />
            </div>
            {validationErrors.username && (
              <div className="field-error">{validationErrors.username}</div>
            )}
          </div>
          
          <div className="form-group">
            <div className="input-icon-wrapper">
              <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Электронная почта"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                className={validationErrors.email ? 'error' : ''}
              />
            </div>
            {validationErrors.email && (
              <div className="field-error">{validationErrors.email}</div>
            )}
          </div>
          
          <div className="form-group">
            <div className="input-icon-wrapper">
              <FontAwesomeIcon icon={faLock} className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={handleChange}
                disabled={isSubmitting}
                className={validationErrors.password ? 'error' : ''}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="toggle-password-btn"
                onClick={() => togglePasswordVisibility('password')}
                disabled={isSubmitting}
              />
            </div>
            {validationErrors.password && (
              <div className="field-error">{validationErrors.password}</div>
            )}
            
            {formData.password && (
              <div className="password-requirements">
                <div className={`requirement ${passwordStrength.isLengthValid ? 'valid' : 'invalid'}`}>
                  <FontAwesomeIcon icon={passwordStrength.isLengthValid ? faCheckCircle : faTimesCircle} />
                  <span>Минимум 8 символов</span>
                </div>
                <div className={`requirement ${passwordStrength.hasLetters ? 'valid' : 'invalid'}`}>
                  <FontAwesomeIcon icon={passwordStrength.hasLetters ? faCheckCircle : faTimesCircle} />
                  <span>Буквы</span>
                </div>
                <div className={`requirement ${passwordStrength.hasNumbers ? 'valid' : 'invalid'}`}>
                  <FontAwesomeIcon icon={passwordStrength.hasNumbers ? faCheckCircle : faTimesCircle} />
                  <span>Цифры</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="form-group">
            <div className="input-icon-wrapper">
              <FontAwesomeIcon icon={faLock} className="input-icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="password2"
                name="password2"
                placeholder="Подтвердите пароль"
                value={formData.password2}
                onChange={handleChange}
                disabled={isSubmitting}
                className={validationErrors.password2 ? 'error' : ''}
              />
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                className="toggle-password-btn"
                onClick={() => togglePasswordVisibility('confirm')}
                disabled={isSubmitting}
              />
            </div>
            {validationErrors.password2 && (
              <div className="field-error">{validationErrors.password2}</div>
            )}
          </div>
          
          <div className="form-group terms-agreement">
            <p>
              Регистрируясь, вы соглашаетесь с нашими <Link to="/terms">Условиями использования</Link> и <Link to="/privacy">Политикой конфиденциальности</Link>.
            </p>
          </div>
          
          <button 
            type="submit" 
            className="auth-submit-btn" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>
        
        <div className="auth-separator">
          <span>или</span>
        </div>
        
        <div className="auth-alternate">
          <p>Уже есть аккаунт?</p>
          <Link to="/auth/login" className="auth-alternate-link">
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register; 