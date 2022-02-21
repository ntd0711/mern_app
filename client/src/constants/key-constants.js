import queryString from 'query-string';

export const generateKeyPost = {
  list(filter) {
    const category = queryString.stringify(filter) || 'all';
    return `POSTS|${category}`;
  },
  detail(postId) {
    return `POST_ID|${postId}`;
  },
  createdByUser(userId) {
    return `POSTS_USER_CREATED|${userId}`;
  },
  savedByUser(userId) {
    return `POSTS_USER_SAVED|${userId}`;
  },
};
