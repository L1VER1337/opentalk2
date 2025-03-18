// Базовый URL API
const API_URL = 'http://localhost:8000/api';

// Получение авторизационного токена
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Базовая функция для запросов к API
const apiCall = async (endpoint, method = 'GET', data = null, withAuth = true) => {
  const url = `${API_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
  };
  
  // Добавляем авторизационный заголовок, если требуется
  if (withAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  const options = {
    method,
    headers,
    credentials: 'include', // для работы с куки
  };
  
  // Добавляем тело запроса для методов, которые его поддерживают
  if (data && ['POST', 'PUT', 'PATCH'].includes(method)) {
    options.body = JSON.stringify(data);
  }
  
  try {
    const response = await fetch(url, options);
    
    // Для ответов без содержимого (204 No Content)
    if (response.status === 204) {
      return { success: true };
    }
    
    // Парсим JSON только если есть содержимое
    const contentType = response.headers.get('content-type');
    const result = contentType && contentType.includes('application/json') 
      ? await response.json() 
      : await response.text();
    
    if (!response.ok) {
      throw {
        status: response.status,
        message: typeof result === 'object' ? (result.detail || 'Произошла ошибка') : 'Произошла ошибка',
        data: result
      };
    }
    
    return result;
  } catch (error) {
    // Перебрасываем ошибку дальше в формате объекта
    if (error.status) {
      throw error;
    } else {
      throw {
        status: 0,
        message: 'Ошибка сети. Проверьте подключение к интернету.',
        data: error
      };
    }
  }
};

// Сервисы для различных API-эндпоинтов
const AuthService = {
  login: (email, password) => apiCall('/auth/login/', 'POST', { email, password }, false),
  register: (userData) => apiCall('/auth/register/', 'POST', userData, false),
  logout: () => apiCall('/auth/logout/', 'POST'),
  verifyToken: () => apiCall('/auth/verify-token/'),
  resetPassword: (email) => apiCall('/auth/reset-password/', 'POST', { email }, false),
  setNewPassword: (token, password) => apiCall('/auth/reset-password/confirm/', 'POST', { token, password }, false),
};

const UserService = {
  getCurrentUser: () => apiCall('/users/me/'),
  updateProfile: (userId, data) => apiCall(`/users/${userId}/`, 'PUT', data),
  getUser: (userId) => apiCall(`/users/${userId}/`),
  getUserPosts: (userId) => apiCall(`/users/${userId}/posts/`),
  getFollowers: (userId) => apiCall(`/users/${userId}/followers/`),
  getFollowing: (userId) => apiCall(`/users/${userId}/following/`),
  followUser: (userId) => apiCall(`/users/${userId}/follow/`, 'POST'),
  unfollowUser: (userId) => apiCall(`/users/${userId}/unfollow/`, 'DELETE'),
  getSuggestedUsers: () => apiCall('/users/suggested/'),
};

const PostService = {
  getFeed: (page = 1, limit = 10) => apiCall(`/posts/?page=${page}&limit=${limit}`),
  createPost: (postData) => apiCall('/posts/', 'POST', postData),
  getPost: (postId) => apiCall(`/posts/${postId}/`),
  updatePost: (postId, postData) => apiCall(`/posts/${postId}/`, 'PUT', postData),
  deletePost: (postId) => apiCall(`/posts/${postId}/`, 'DELETE'),
  likePost: (postId) => apiCall(`/posts/${postId}/like/`, 'POST'),
  unlikePost: (postId) => apiCall(`/posts/${postId}/unlike/`, 'DELETE'),
  repostPost: (postId, content = '') => apiCall(`/posts/${postId}/repost/`, 'POST', { content }),
  getPostComments: (postId) => apiCall(`/posts/${postId}/comments/`),
};

const CommentService = {
  createComment: (commentData) => apiCall('/comments/', 'POST', commentData),
  updateComment: (commentId, commentData) => apiCall(`/comments/${commentId}/`, 'PUT', commentData),
  deleteComment: (commentId) => apiCall(`/comments/${commentId}/`, 'DELETE'),
  likeComment: (commentId) => apiCall(`/comments/${commentId}/like/`, 'POST'),
  unlikeComment: (commentId) => apiCall(`/comments/${commentId}/unlike/`, 'DELETE'),
};

const ChatService = {
  getChats: () => apiCall('/chats/'),
  createChat: (chatData) => apiCall('/chats/', 'POST', chatData),
  getChat: (chatId) => apiCall(`/chats/${chatId}/`),
  updateChat: (chatId, chatData) => apiCall(`/chats/${chatId}/`, 'PUT', chatData),
  getChatMessages: (chatId) => apiCall(`/chats/${chatId}/messages/`),
  sendMessage: (chatId, messageData) => apiCall(`/chats/${chatId}/messages/`, 'POST', messageData),
  updateMessage: (messageId, messageData) => apiCall(`/messages/${messageId}/`, 'PUT', messageData),
  deleteMessage: (messageId) => apiCall(`/messages/${messageId}/`, 'DELETE'),
  addChatMember: (chatId, userId) => apiCall(`/chats/${chatId}/members/`, 'POST', { user_id: userId }),
  removeChatMember: (chatId, userId) => apiCall(`/chats/${chatId}/members/${userId}/`, 'DELETE'),
};

const VoiceService = {
  getVoiceChannels: () => apiCall('/voice-channels/'),
  createVoiceChannel: (channelData) => apiCall('/voice-channels/', 'POST', channelData),
  getVoiceChannel: (channelId) => apiCall(`/voice-channels/${channelId}/`),
  joinVoiceChannel: (channelId) => apiCall(`/voice-channels/${channelId}/join/`, 'POST'),
  leaveVoiceChannel: (channelId) => apiCall(`/voice-channels/${channelId}/leave/`, 'DELETE'),
  toggleMic: (channelId, status) => apiCall(`/voice-channels/${channelId}/mic/`, 'PUT', { status }),
  toggleSpeaker: (channelId, status) => apiCall(`/voice-channels/${channelId}/speaker/`, 'PUT', { status }),
};

const CallService = {
  initiateCall: (userId, callType) => apiCall('/calls/', 'POST', { receiver_id: userId, call_type: callType }),
  acceptCall: (callId) => apiCall(`/calls/${callId}/accept/`, 'PUT'),
  declineCall: (callId) => apiCall(`/calls/${callId}/decline/`, 'PUT'),
  endCall: (callId) => apiCall(`/calls/${callId}/end/`, 'PUT'),
  getCallHistory: () => apiCall('/calls/history/'),
};

const NotificationService = {
  getNotifications: () => apiCall('/notifications/'),
  markNotificationAsRead: (notificationId) => apiCall(`/notifications/${notificationId}/read/`, 'PUT'),
  markAllNotificationsAsRead: () => apiCall('/notifications/read-all/', 'PUT'),
  deleteNotification: (notificationId) => apiCall(`/notifications/${notificationId}/`, 'DELETE'),
};

const TrendService = {
  getTrends: () => apiCall('/trends/'),
  getPostsByHashtag: (hashtag) => apiCall(`/hashtags/${hashtag}/posts/`),
  getTrendsByCategory: (category) => apiCall(`/trends/categories/?category=${category}`),
};

const PremiumService = {
  getPlans: () => apiCall('/premium/plans/'),
  subscribe: (planData) => apiCall('/premium/subscribe/', 'POST', planData),
  getStatus: () => apiCall('/premium/status/'),
  cancelSubscription: () => apiCall('/premium/cancel/', 'DELETE'),
};

const SearchService = {
  searchUsers: (query) => apiCall(`/search/users/?q=${encodeURIComponent(query)}`),
  searchPosts: (query) => apiCall(`/search/posts/?q=${encodeURIComponent(query)}`),
  searchHashtags: (query) => apiCall(`/search/hashtags/?q=${encodeURIComponent(query)}`),
  search: (query) => apiCall(`/search/?q=${encodeURIComponent(query)}`),
};

const SettingsService = {
  getSettings: () => apiCall('/settings/'),
  updateSettings: (settingsData) => apiCall('/settings/', 'PUT', settingsData),
  updateTheme: (theme) => apiCall('/settings/theme/', 'PUT', { theme }),
  updatePrivacySettings: (privacyData) => apiCall('/settings/privacy/', 'PUT', privacyData),
};

export { 
  AuthService, 
  UserService, 
  PostService, 
  CommentService, 
  ChatService, 
  VoiceService, 
  CallService, 
  NotificationService, 
  TrendService, 
  PremiumService, 
  SearchService, 
  SettingsService
}; 