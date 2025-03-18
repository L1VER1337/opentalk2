import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faShareSquare, faRetweet } from '@fortawesome/free-solid-svg-icons';
import { faComment, faHeart, faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid, faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';
import '../styles/Post.css';

const Post = ({ post, onPostAction }) => {
  return (
    <div className="post">
      <div className="post-avatar">
        <img src={post.avatar} alt="Аватар пользователя" />
      </div>
      <div className="post-content">
        <div className="post-header">
          <div className="post-user-info">
            <p className="post-username">{post.username}</p>
            <p className="post-handle">{post.handle}</p>
            <p className="post-time">· {post.time}</p>
          </div>
          <div className="post-menu">
            <FontAwesomeIcon icon={faEllipsis} />
          </div>
        </div>
        <div className="post-text">
          <p>{post.text}</p>
        </div>
        
        {post.image && (
          <div className="post-image">
            <img src={post.image} alt="Пост изображение" />
          </div>
        )}
        
        {post.images && post.images.length > 0 && (
          <div className={`post-image-grid grid-${post.images.length}`}>
            {post.images.map((img, index) => (
              <img key={index} src={img} alt={`Изображение ${index + 1}`} />
            ))}
          </div>
        )}
        
        <div className="post-actions-bar">
          <div className="post-action" onClick={() => console.log('comment')}>
            <FontAwesomeIcon icon={faComment} />
            <span>{post.comments}</span>
          </div>
          <div className="post-action" onClick={() => console.log('repost')}>
            <FontAwesomeIcon icon={faRetweet} />
            <span>{post.reposts}</span>
          </div>
          <div 
            className="post-action" 
            onClick={() => onPostAction(post.id, 'like')}
          >
            <FontAwesomeIcon 
              icon={post.isLiked ? faHeartSolid : faHeart} 
              className={post.isLiked ? 'liked' : ''}
            />
            <span>{post.likes}</span>
          </div>
          <div 
            className="post-action"
            onClick={() => onPostAction(post.id, 'bookmark')}
          >
            <FontAwesomeIcon 
              icon={post.isBookmarked ? faBookmarkSolid : faBookmark} 
            />
          </div>
          <div className="post-action">
            <FontAwesomeIcon icon={faShareSquare} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post; 