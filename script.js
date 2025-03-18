// Функция для переключения темы
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;
    
    // Проверяем сохраненную тему в localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Устанавливаем тему при загрузке страницы
    if (savedTheme === 'dark') {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        updateThemeToggleButton(true);
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        updateThemeToggleButton(false);
    }
    
    // Обработчик события для переключения темы
    themeToggleBtn.addEventListener('click', () => {
        const isDarkTheme = body.classList.contains('dark-theme');
        
        if (isDarkTheme) {
            // Переключаем на светлую тему
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            updateThemeToggleButton(false);
        } else {
            // Переключаем на темную тему
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            updateThemeToggleButton(true);
        }
    });
    
    // Функция для обновления иконки и текста кнопки переключения темы
    function updateThemeToggleButton(isDarkTheme) {
        const buttonIcon = themeToggleBtn.querySelector('i');
        const buttonText = themeToggleBtn.querySelector('span');
        
        if (isDarkTheme) {
            buttonIcon.classList.remove('fa-moon');
            buttonIcon.classList.add('fa-sun');
            buttonText.textContent = 'Светлая тема';
        } else {
            buttonIcon.classList.remove('fa-sun');
            buttonIcon.classList.add('fa-moon');
            buttonText.textContent = 'Тёмная тема';
        }
    }
});

// Обработчики событий для интерактивных элементов
document.addEventListener('DOMContentLoaded', () => {
    const postActions = document.querySelectorAll('.post-action');
    
    // Добавляем интерактивность к кнопкам действий с постами
    postActions.forEach(action => {
        action.addEventListener('click', () => {
            const icon = action.querySelector('i');
            const counter = action.querySelector('span');
            
            // Для демонстрации лайков
            if (icon.classList.contains('fa-heart')) {
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    icon.style.color = '#e0245e';
                    if (counter) {
                        counter.textContent = (parseInt(counter.textContent) + 1).toString();
                    }
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    icon.style.color = '';
                    if (counter) {
                        counter.textContent = (parseInt(counter.textContent) - 1).toString();
                    }
                }
            }
            
            // Для демонстрации закладок
            if (icon.classList.contains('fa-bookmark')) {
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                }
            }
        });
    });
    
    // Добавляем интерактивность к табам ленты
    const feedTabs = document.querySelectorAll('.feed-tabs .tab');
    feedTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            feedTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
    
    // Добавляем интерактивность к кнопкам "Читать"
    const followButtons = document.querySelectorAll('.follow-btn');
    followButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent === 'Читать') {
                button.textContent = 'Читаю';
                button.style.backgroundColor = '#5A9CAA';
            } else {
                button.textContent = 'Читать';
                button.style.backgroundColor = '';
            }
        });
    });
    
    // Анимация при наведении на посты
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        post.addEventListener('mouseenter', () => {
            post.style.transform = 'translateY(-2px)';
            post.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            post.style.transition = 'transform 0.3s, box-shadow 0.3s';
        });
        
        post.addEventListener('mouseleave', () => {
            post.style.transform = 'translateY(0)';
            post.style.boxShadow = 'none';
        });
    });

    // Функциональность для звонков
    setupCallFunctionality();

    // Функциональность для премиум раздела
    setupPremiumFunctionality();
});

// Настройка функциональности звонков
function setupCallFunctionality() {
    const callModal = document.getElementById('call-modal');
    const callBtn = document.getElementById('call-btn');
    const closeCallBtn = document.querySelector('.close-call-btn');
    const declineCallBtn = document.querySelector('.decline-call-btn');
    const acceptCallBtn = document.querySelector('.accept-call-btn');
    const videoCallBtn = document.querySelector('.video-call-btn');
    const chatActionBtns = document.querySelectorAll('.chat-action-btn');

    // Функция показа модального окна звонка
    function showCallModal() {
        callModal.classList.add('active');
        setTimeout(() => {
            // Автоматический звуковой сигнал (в реальном приложении)
            console.log('Звуковой сигнал звонка...');
        }, 500);
    }

    // Функция скрытия модального окна звонка
    function hideCallModal() {
        callModal.classList.remove('active');
    }

    // Обработчик события для кнопки звонка в верхней панели
    if (callBtn) {
        callBtn.addEventListener('click', () => {
            showCallModal();
        });
    }

    // Обработчик события для кнопок звонка в чатах
    chatActionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            showCallModal();
        });
    });

    // Обработчик события для кнопки закрытия модального окна звонка
    if (closeCallBtn) {
        closeCallBtn.addEventListener('click', () => {
            hideCallModal();
        });
    }

    // Обработчик события для кнопки отклонения звонка
    if (declineCallBtn) {
        declineCallBtn.addEventListener('click', () => {
            console.log('Звонок отклонен');
            hideCallModal();
        });
    }

    // Обработчик события для кнопки принятия звонка
    if (acceptCallBtn) {
        acceptCallBtn.addEventListener('click', () => {
            const callerInfoElement = document.querySelector('.caller-info');
            const callStatusElement = document.querySelector('.call-status');
            const callActionsElement = document.querySelector('.call-actions');
            
            if (callStatusElement) {
                callStatusElement.textContent = 'Звонок начался';
                callStatusElement.style.color = '#4CAF50';
            }
            
            // Изменение кнопок после принятия звонка
            if (callActionsElement) {
                callActionsElement.innerHTML = `
                    <button class="call-action-btn mute-btn"><i class="fas fa-microphone-slash"></i></button>
                    <button class="call-action-btn speaker-btn"><i class="fas fa-volume-up"></i></button>
                    <button class="end-call-btn"><i class="fas fa-phone-slash"></i></button>
                `;
                
                // Добавление обработчика события для кнопки завершения звонка
                const endCallBtn = callActionsElement.querySelector('.end-call-btn');
                if (endCallBtn) {
                    endCallBtn.addEventListener('click', () => {
                        hideCallModal();
                    });
                }
            }
            
            console.log('Звонок принят');
        });
    }

    // Обработчик события для кнопки видеозвонка
    if (videoCallBtn) {
        videoCallBtn.addEventListener('click', () => {
            const callerInfoElement = document.querySelector('.caller-info');
            const callStatusElement = document.querySelector('.call-status');
            
            if (callStatusElement) {
                callStatusElement.textContent = 'Видеозвонок начался';
                callStatusElement.style.color = '#4CAF50';
            }
            
            console.log('Видеозвонок начался');
        });
    }

    // Обработчик события для кнопок присоединения к голосовым каналам
    const joinVoiceButtons = document.querySelectorAll('.join-voice-btn');
    joinVoiceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const channelName = e.target.closest('.voice-channel-item').querySelector('.voice-channel-name').textContent;
            
            if (button.textContent === 'Войти') {
                button.textContent = 'Выйти';
                button.style.backgroundColor = '#F44336';
                console.log(`Вы присоединились к каналу: ${channelName}`);
            } else {
                button.textContent = 'Войти';
                button.style.backgroundColor = '';
                console.log(`Вы покинули канал: ${channelName}`);
            }
        });
    });
}

// Настройка функциональности премиум раздела
function setupPremiumFunctionality() {
    const premiumModal = document.getElementById('premium-modal');
    const premiumBanner = document.querySelector('.premium-banner');
    const premiumMenuItem = document.querySelector('.premium-menu-item');
    const closePremiumBtn = document.querySelector('.close-premium-btn');
    const premiumBtn = document.querySelector('.premium-btn');
    const planSelectBtns = document.querySelectorAll('.plan-select-btn');

    // Функция показа модального окна премиума
    function showPremiumModal() {
        premiumModal.classList.add('active');
    }

    // Функция скрытия модального окна премиума
    function hidePremiumModal() {
        premiumModal.classList.remove('active');
    }

    // Обработчик события для премиум баннера
    if (premiumBanner) {
        premiumBanner.addEventListener('click', () => {
            showPremiumModal();
        });
    }

    // Обработчик события для кнопки "Подключить" на премиум баннере
    if (premiumBtn) {
        premiumBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showPremiumModal();
        });
    }

    // Обработчик события для пункта меню "Премиум"
    if (premiumMenuItem) {
        premiumMenuItem.addEventListener('click', () => {
            showPremiumModal();
        });
    }

    // Обработчик события для кнопки закрытия модального окна премиума
    if (closePremiumBtn) {
        closePremiumBtn.addEventListener('click', () => {
            hidePremiumModal();
        });
    }

    // Обработчик события для кнопок выбора плана
    planSelectBtns.forEach(button => {
        button.addEventListener('click', () => {
            const planType = button.closest('.premium-plan').querySelector('h4').textContent;
            console.log(`Выбран план: ${planType}`);
            
            // В реальном приложении здесь был бы переход на страницу оплаты
            alert(`Вы выбрали ${planType}. Сейчас вы будете перенаправлены на страницу оплаты.`);
            
            hidePremiumModal();
        });
    });

    // Закрыть модальное окно при клике вне его содержимого
    window.addEventListener('click', (e) => {
        if (e.target === premiumModal) {
            hidePremiumModal();
        }
        if (e.target === document.getElementById('call-modal')) {
            document.getElementById('call-modal').classList.remove('active');
        }
    });
} 