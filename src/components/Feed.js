import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faImage, faVideo, faPollH, faSmile, faEllipsis, faShareSquare
} from '@fortawesome/free-solid-svg-icons';
import { faComment, faHeart, faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import '../styles/Feed.css';
import Post from './Post';

const Feed = () => {
  const [activeTab, setActiveTab] = useState('for-you');
  const [posts, setPosts] = useState([
    {
      id: 1,
      avatar: 'https://i.pravatar.cc/150?img=28',
      username: 'Мария Иванова',
      handle: '@maria_iv',
      time: '2ч',
      text: 'Наконец-то попробовала новую социальную сеть OpenTalk! Дизайн просто потрясающий, сочетание функций из разных платформ - это именно то, чего не хватало на рынке! 🚀',
      image: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      comments: 42,
      reposts: 12,
      likes: 128,
      isLiked: false,
      isBookmarked: false
    },
    {
      id: 2,
      avatar: 'https://i.pravatar.cc/150?img=33',
      username: 'Иван Петров',
      handle: '@ivan_petrov',
      time: '5ч',
      text: 'Работаю над новым проектом с использованием React и TypeScript. Кто еще использует этот стек? Какие библиотеки UI компонентов предпочитаете? #разработка #frontend',
      image: null,
      comments: 18,
      reposts: 5,
      likes: 37,
      isLiked: false,
      isBookmarked: false
    },
    {
      id: 3,
      avatar: 'https://i.pravatar.cc/150?img=19',
      username: 'Алексей Смирнов',
      handle: '@alex_design',
      time: '8ч',
      text: 'Делюсь своим новым дизайн-проектом! Мобильное приложение для фитнес-трекинга с уникальным UI/UX. Отзывы приветствуются!',
      images: [
        'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        'https://images.unsplash.com/photo-1611162618758-2a29a995354b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
      ],
      comments: 24,
      reposts: 8,
      likes: 72,
      isLiked: false,
      isBookmarked: false
    }
  ]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handlePostAction = (postId, action) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        switch(action) {
          case 'like':
            return {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            };
          case 'bookmark':
            return {
              ...post,
              isBookmarked: !post.isBookmarked
            };
          default:
            return post;
        }
      }
      return post;
    }));
  };

  return (
    <div className="feed">
      <div className="feed-tabs">
        <div 
          className={`tab ${activeTab === 'for-you' ? 'active' : ''}`}
          onClick={() => handleTabChange('for-you')}
        >
          Для вас
        </div>
        <div 
          className={`tab ${activeTab === 'following' ? 'active' : ''}`}
          onClick={() => handleTabChange('following')}
        >
          Подписки
        </div>
        <div 
          className={`tab ${activeTab === 'popular' ? 'active' : ''}`}
          onClick={() => handleTabChange('popular')}
        >
          Популярное
        </div>
      </div>

      {/* Форма создания поста */}
      <div className="create-post">
        <div className="post-avatar">
          <img src="https://i.pravatar.cc/150?img=12" alt="Аватар пользователя" />
        </div>
        <div className="post-input-container">
          <textarea placeholder="Что нового?"></textarea>
          <div className="post-actions">
            <div className="post-attachments">
              <button className="attach-btn">
                <FontAwesomeIcon icon={faImage} />
              </button>
              <button className="attach-btn">
                <FontAwesomeIcon icon={faVideo} />
              </button>
              <button className="attach-btn">
                <FontAwesomeIcon icon={faPollH} />
              </button>
              <button className="attach-btn">
                <FontAwesomeIcon icon={faSmile} />
              </button>
            </div>
            <button className="post-submit-btn">Опубликовать</button>
          </div>
        </div>
      </div>

      {/* Посты */}
      <div className="posts">
        {posts.map(post => (
          <Post 
            key={post.id} 
            post={post} 
            onPostAction={handlePostAction} 
          />
        ))}
      </div>
    </div>
  );
};

export default Feed; 