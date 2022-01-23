import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import { InputField } from 'components';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import EditorPost from './post-editor';

function PostForm({ onSubmit, post }) {
  const schema = yup.object().shape({
    title: yup
      .string()
      .required()
      .test('check title', 'title at least two word', (value) => {
        return value.split(' ').filter((x) => x.length >= 2).length >= 2;
      }),
    content: yup
      .string()
      .required()
      .test('check content', 'content at least two word', (value) => {
        return value.split(' ').filter((x) => x.length >= 2).length >= 2;
      }),
    description: yup
      .string()
      .required()
      .test('check description', 'description at least two word', (value) => {
        return value.split(' ').filter((x) => x.length >= 2).length >= 2;
      }),
    tags: yup.string().required(),
  });

  const { handleSubmit, control, setValue, reset, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
      description: post?.description || '',
      tags: post?.tags.join(' ') || '',
    },
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = (data) => {
    if (onSubmit) {
      onSubmit(data);
      // reset();
    }
  };

  const handleChangeContent = (value) => {
    setValue('content', value);
  };

  return (
    <Box
      component="form"
      sx={{
        borderRadius: '10px',
        border: '2px solid rgba(255,255,255,0.1)',
        boxShadow: '0 0 40px rgba(8,7,16,0.6)',
        padding: '50px 35px',
      }}
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <InputField
        name="title"
        placeholder="Title"
        value={getValues('title')}
        setValue={setValue}
        control={control}
      />
      <EditorPost onChange={handleChangeContent} value={getValues('content')} />
      <InputField
        name="description"
        placeholder="Description"
        value={getValues('title')}
        setValue={setValue}
        fullWidth
        control={control}
      />
      <InputField
        name="tags"
        placeholder="Tags"
        value={getValues('tags')}
        setValue={setValue}
        fullWidth
        control={control}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {post ? 'Update' : 'Create'}
      </Button>
    </Box>
  );
}

export default PostForm;
