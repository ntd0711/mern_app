import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import TagElement from '../../../components/chip';

function PostFilters({ onTagChange, onSearchChange, filters, postTags }) {
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState('');

  const handleOnclickTag = (tag) => {
    if (onTagChange) onTagChange({ tag });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearchChange) onSearchChange({ search });
  };

  const handleShowSearch = () => {
    setShowSearch((prev) => !prev);
    setSearch('');
  };

  return (
    <>
      {Boolean(Object.keys(postTags).length) && (
        <Stack
          position="relative"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: `${showSearch ? 'block' : 'none'}`,
              position: 'absolute',
              bgcolor: 'common.dark',
              width: '100%',
              ml: '-10px',
            }}
          >
            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              inputRef={(inputRef) => inputRef && inputRef.focus()}
              autoFocus
              placeholder="Search"
              InputProps={{
                endAdornment: (
                  <>
                    {search && (
                      <InputAdornment sx={{ mr: '10%' }} position="end">
                        <IconButton
                          onClick={() => setSearch('')}
                          sx={{ color: 'common.grey_white', fontSize: '1rem' }}
                        >
                          <i className="bx bx-x"></i>
                        </IconButton>
                      </InputAdornment>
                    )}
                  </>
                ),
              }}
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  color: '#eee',
                  '& input': {
                    borderColor: 'transparent',
                    display: 'block',
                    height: '44px',
                    width: '100%',
                    bgcolor: 'common.dark',
                    borderRadius: '3px',
                    padding: '0 10px',
                    fontSize: '16px',
                    '$::placeholder': {
                      color: ' #e5e5e5',
                    },
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent',
                  },
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                },
              }}
            />
          </Box>

          <Stack
            columnGap={1}
            rowGap={1}
            direction="row"
            flexWrap="wrap"
            sx={{
              transition: '.2s linear',
              opacity: `${showSearch ? '0' : '1'}`,
              visibility: `${showSearch ? 'hidden' : 'visible'}`,
            }}
          >
            {Object.keys(postTags).map((label) => (
              <TagElement
                key={label}
                tag={{ label: label, quantity: postTags[label] }}
                onClickTag={handleOnclickTag}
                active={filters.tag === label}
              />
            ))}
          </Stack>

          <IconButton
            sx={{
              bgcolor: 'common.blue',
              position: 'absolute',
              right: '0',
              zIndex: '26',
              fontSize: '1.1rem',
              color: 'common.dark',
              '&:hover': {
                bgcolor: 'common.blue',
              },
            }}
            onClick={handleShowSearch}
          >
            <i
              style={{
                width: `${showSearch ? '19px' : '0px'}`,
                overflow: 'hidden',
                transition: '0.3s ease-in-out',
                opacity: `${showSearch ? '1' : '0'}`,
                visibility: `${showSearch ? 'visible' : 'hidden'}`,
              }}
              className="bx bx-x"
            ></i>
            <i
              style={{
                width: `${!showSearch ? '19px' : '0px'}`,
                overflow: 'hidden',
                transition: '0.3s ease-in-out',
                opacity: `${!showSearch ? '1' : '0'}`,
                visibility: `${!showSearch ? 'visible' : 'hidden'}`,
              }}
              className="bx bx-search-alt-2"
            ></i>
          </IconButton>
        </Stack>
      )}
    </>
  );
}

export default PostFilters;
