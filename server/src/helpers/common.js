import createError from 'http-errors';

export const checkStatusVotePost = (likes, dislikes, userId) => {
  if (!Array.isArray(likes) || !Array.isArray(dislikes))
    throw createError.BadRequest('like or dislike is not valid');

  const status = likes.includes(userId)
    ? 'liked'
    : dislikes.includes(userId)
    ? 'disliked'
    : 'notVote';

  return status;
};
