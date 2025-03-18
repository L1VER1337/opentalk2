import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt, faMapMarkerAlt, faLink, faEllipsisH, 
  faBell, faUserPlus, faUserMinus, faPen
} from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../context/AuthContext';
import '../../styles/Profile.css';
import Post from '../../components/Post';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { username } = useParams();
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [isFollowing, setIsFollowing] = useState(false);
  const [isNotified, setIsNotified] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Если username не передан в URL, показываем профиль текущего пользователя
  const isCurrentUserProfile = !username || (user && username === user.username);
  
  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      
      try {
        // Имитация загрузки данных профиля с API
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Если это профиль текущего пользователя, используем данные из контекста
        if (isCurrentUserProfile && user) {
          setProfileData({
            ...user,
            followers_count: user.followers_count || 128,
            following_count: user.following_count || 243,
            posts_count: user.posts_count || 56,
            join_date: user.join_date || 'Январь 2023'
          });
        } else {
          // Иначе загружаем данные запрашиваемого профиля
          // Здесь будет запрос к API
          setProfileData({
            id: 2,
            username: username || 'username',
            full_name: 'Пользователь OpenTalk',
            avatar: 'https://i.pravatar.cc/150?img=12',
            cover: 'https://picsum.photos/1500/500',
            bio: 'Это страница профиля пользователя OpenTalk. Здесь можно увидеть информацию о пользователе, его посты и медиа.',
            location: 'Москва, Россия',
            website: 'https://opentalk.ru',
            followers_count: 1024,
            following_count: 512,
            posts_count: 128,
            join_date: 'Март 2022',
            status: 'online'
          });
          
          // Проверяем, подписан ли пользователь на этот профиль
          setIsFollowing(Math.random() > 0.5);
          setIsNotified(Math.random() > 0.5);
        }
        
        // Загрузка постов пользователя
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Примерные данные постов
        setPosts([
          {
            id: 1,
            avatar: profileData?.avatar || 'https://i.pravatar.cc/150?img=12',
            user_id: profileData?.id || 2,
            username: profileData?.username || username || 'username',
            full_name: profileData?.full_name || 'Пользователь OpenTalk',
            time: '2 часа назад',
            content: 'Это пример поста в ленте профиля. Здесь пользователи могут делиться своими мыслями, фотографиями или видео.',
            image: 'https://picsum.photos/600/400',
            likes: 42,
            comments: 12,
            reposts: 5,
            bookmarks: 3,
            liked: false,
            bookmarked: false,
            reposted: false
          },
          {
            id: 2,
            avatar: profileData?.avatar || 'https://i.pravatar.cc/150?img=12',
            user_id: profileData?.id || 2,
            username: profileData?.username || username || 'username',
            full_name: profileData?.full_name || 'Пользователь OpenTalk',
            time: '1 день назад',
            content: 'Еще один пример поста в ленте профиля. Этот без изображения, просто текстовый пост.',
            likes: 18,
            comments: 7,
            reposts: 2,
            bookmarks: 1,
            liked: true,
            bookmarked: false,
            reposted: false
          }
        ]);
        
      } catch (error) {
        console.error('Ошибка загрузки профиля:', error);
        // Обработка ошибки загрузки профиля
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, [isCurrentUserProfile, user, username]);
  
  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    // Здесь будет API-запрос на подписку/отписку
  };
  
  const handleNotificationToggle = () => {
    setIsNotified(!isNotified);
    // Здесь будет API-запрос на изменение настроек уведомлений
  };
  
  if (loading) {
    return (
      <div className="loading-profile">
        <div className="spinner"></div>
        <p>Загрузка профиля...</p>
      </div>
    );
  }
  
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="cover-photo" style={{ backgroundImage: `url(${profileData?.cover || 'https://picsum.photos/1500/500'})` }}>
          {isCurrentUserProfile && (
            <button className="edit-cover-button">
              <FontAwesomeIcon icon={faPen} />
            </button>
          )}
        </div>
        
        <div className="profile-info">
          <div className="profile-avatar-container">
            <img 
              src={profileData?.avatar || 'https://i.pravatar.cc/150?img=12'} 
              alt={profileData?.full_name} 
              className="profile-avatar"
            />
            {profileData?.status && (
              <div className={`status-indicator status-${profileData.status}`}></div>
            )}
            {isCurrentUserProfile && (
              <button className="edit-avatar-button">
                <FontAwesomeIcon icon={faPen} />
              </button>
            )}
          </div>
          
          <div className="profile-actions">
            {isCurrentUserProfile ? (
              <Link to="/settings/profile" className="edit-profile-button">
                <FontAwesomeIcon icon={faPen} /> Редактировать профиль
              </Link>
            ) : (
              <div className="user-actions">
                <button 
                  className={`follow-button ${isFollowing ? 'following' : ''}`}
                  onClick={handleFollowToggle}
                >
                  {isFollowing ? (
                    <>
                      <FontAwesomeIcon icon={faUserMinus} /> Отписаться
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faUserPlus} /> Подписаться
                    </>
                  )}
                </button>
                
                <button 
                  className={`notification-button ${isNotified ? 'active' : ''}`}
                  onClick={handleNotificationToggle}
                >
                  <FontAwesomeIcon icon={faBell} />
                </button>
                
                <button className="more-options-button">
                  <FontAwesomeIcon icon={faEllipsisH} />
                </button>
              </div>
            )}
          </div>
          
          <div className="profile-details">
            <h1 className="profile-name">{profileData?.full_name}</h1>
            <p className="profile-username">@{profileData?.username}</p>
            
            {profileData?.bio && (
              <p className="profile-bio">{profileData.bio}</p>
            )}
            
            <div className="profile-meta">
              {profileData?.location && (
                <span className="profile-location">
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> {profileData.location}
                </span>
              )}
              
              {profileData?.website && (
                <span className="profile-website">
                  <FontAwesomeIcon icon={faLink} /> 
                  <a href={profileData.website} target="_blank" rel="noopener noreferrer">
                    {profileData.website.replace(/(https?:\/\/)?(www\.)?/i, '')}
                  </a>
                </span>
              )}
              
              {profileData?.join_date && (
                <span className="profile-join-date">
                  <FontAwesomeIcon icon={faCalendarAlt} /> Присоединился(ась) в {profileData.join_date}
                </span>
              )}
            </div>
            
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-value">{profileData?.posts_count || 0}</span>
                <span className="stat-label">Публикаций</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{profileData?.followers_count || 0}</span>
                <span className="stat-label">Подписчиков</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{profileData?.following_count || 0}</span>
                <span className="stat-label">Подписок</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="profile-content">
        <div className="profile-tabs">
          <button 
            className={`tab-button ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            Публикации
          </button>
          <button 
            className={`tab-button ${activeTab === 'media' ? 'active' : ''}`}
            onClick={() => setActiveTab('media')}
          >
            Медиа
          </button>
          <button 
            className={`tab-button ${activeTab === 'likes' ? 'active' : ''}`}
            onClick={() => setActiveTab('likes')}
          >
            Нравится
          </button>
        </div>
        
        <div className="profile-content-area">
          {activeTab === 'posts' && (
            <div className="posts-container">
              {posts.length > 0 ? (
                posts.map(post => (
                  <Post key={post.id} post={post} />
                ))
              ) : (
                <div className="no-posts-message">
                  <p>Нет опубликованных постов</p>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'media' && (
            <div className="media-container">
              <p>Здесь будут отображаться фото и видео пользователя</p>
            </div>
          )}
          
          {activeTab === 'likes' && (
            <div className="likes-container">
              <p>Здесь будут отображаться публикации, которые понравились пользователю</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 