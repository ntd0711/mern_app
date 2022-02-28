import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import { ButtonCustom, InputField } from 'components';
import React from 'react';
import { useForm } from 'react-hook-form';
import Comment from './comment';

function PostComments({ comments = [], onSubmit, authorId, commentRef, loadingCmt }) {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      comment: '',
    },
  });

  const handleOnSubmit = (data) => {
    if (onSubmit) {
      onSubmit(data);
      reset();
    }
  };

  return (
    <Box
      ref={commentRef}
      sx={{ border: '2px solid rgba(255,255,255,0.1)', padding: '30px', mb: '1.6rem' }}
    >
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <Box
          component="form"
          onSubmit={handleSubmit(handleOnSubmit)}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexBasis: '100%',
            alignItems: 'center',
            columnGap: '1rem',
          }}
        >
          <InputField name="comment" placeholder="add comment" control={control} height="44px" />

          <ButtonCustom
            disabled={loadingCmt}
            parentIconWidth="48px"
            iconSize="1.1rem"
            spacing="0.2rem"
          >
            comment
          </ButtonCustom>
        </Box>
      </Stack>
      <Stack spacing={3}>
        {comments.map((cmt) => (
          <Comment key={cmt._id} cmt={cmt} authorId={authorId} />
        ))}
      </Stack>
    </Box>
  );
}

export default PostComments;
