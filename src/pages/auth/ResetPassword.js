import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import '../../styles/AuthPages.css';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Пожалуйста, введите электронную почту');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Здесь будет логика отправки запроса на сброс пароля
      // Имитация задержки запроса
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
    } catch (err) {
      setError('Произошла ошибка при отправке запроса на сброс пароля. Пожалуйста, попробуйте снова.');
      console.error('Reset password error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {!isSubmitted ? (
          <>
            <div className="auth-header">
              <h2>Сброс пароля</h2>
              <p>Введите адрес электронной почты, связанный с вашей учетной записью</p>
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="input-icon-wrapper">
                  <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Электронная почта"
                    value={email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Отправка...' : 'Отправить ссылку для сброса пароля'}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                <Link to="/auth/login" className="back-link">
                  <FontAwesomeIcon icon={faArrowLeft} /> Вернуться ко входу
                </Link>
              </p>
            </div>
          </>
        ) : (
          <div className="success-message">
            <FontAwesomeIcon icon={faCheck} className="success-icon" />
            <h2>Ссылка для сброса пароля отправлена</h2>
            <p>
              Мы отправили инструкции по сбросу пароля на адрес {email}. 
              Пожалуйста, проверьте свою электронную почту.
            </p>
            <div className="auth-footer">
              <p>
                <Link to="/auth/login" className="btn-primary">
                  Вернуться ко входу
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword; 