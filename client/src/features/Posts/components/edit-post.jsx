import { IconButton } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { TiEdit } from 'react-icons/ti';

function EditPost({ authorId, myId, postId, pathname }) {
  const isEdit = authorId === myId && pathname === '/profile';
  return (
    <>
      {isEdit ? (
        <Link to={`/posts/update/${postId}`}>
          <IconButton size="small" sx={{ fontSize: '1rem', color: 'common.dark_blue', ml: 4 }}>
            <TiEdit title="edit post" />
          </IconButton>
        </Link>
      ) : (
        <></>
      )}
    </>
  );
}

export default EditPost;
