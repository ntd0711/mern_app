import { Stack } from '@mui/material';
import { AvatarCustom } from 'components';
import useScroll from 'hooks/use-scroll';
import React from 'react';
import BookmarkPost from './bookmark-post';
import CommentCount from './comment-count';
import SharePost from './share-post';
import VotePost from './vote-post';

function StickyBar({ post, onLike, onDislike, scrollToComment, onSave }) {
  const isVisible = useScroll({ pageYOffset: 100 });
  const { author, comments } = post;

  return (
    <Stack
      position="fixed"
      zIndex="99"
      alignItems="center"
      spacing={1.6}
      sx={{
        left: '10%',
        top: '25%',
        transition: 'all .3s linear',
        opacity: `${isVisible ? '1' : '0'}`,
        visibility: `${isVisible ? 'visible' : 'hidden'}`,
      }}
    >
      <VotePost post={post} onLike={onLike} onDislike={onDislike} />
      <AvatarCustom url={author.avatar} size={2.6} />
      <BookmarkPost post={post} onSave={onSave} />
      <CommentCount quantity={comments.length} scrollToComment={scrollToComment} />
      <SharePost />
    </Stack>
  );
}

export default StickyBar;
