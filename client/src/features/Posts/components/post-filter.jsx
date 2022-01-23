import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import { InputField } from 'components';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import TagElement from '../../../components/chip';
import { fetchTagsPost } from '../posts-thunk';

function PostFilters({ onTagChange, onSearchChange, filters }) {
  const dispatch = useDispatch();
  const { postTags } = useSelector((state) => state.posts);
  const { handleSubmit, control } = useForm({
    defaultValues: {
      search: '',
    },
  });

  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchTagsPost());
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);

  const handleOnclickTag = (tag) => {
    if (onTagChange) onTagChange({ tag });
  };

  const handleOnSubmit = (data) => {
    if (onSearchChange) onSearchChange(data);
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
        <InputField control={control} name="search" placeholder="search" height="44px" />
      </Box>
      <Stack mt={2} columnGap={1} rowGap={1} flexDirection="row" flexWrap="wrap">
        {Object.keys(postTags).map((label) => (
          <TagElement
            key={label}
            tag={{ label: label, quantity: postTags[label] }}
            onClickTag={handleOnclickTag}
            active={filters.tag === label}
          />
        ))}
      </Stack>
    </>
  );
}

export default PostFilters;
