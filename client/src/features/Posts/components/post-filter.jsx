import { Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { postsApi } from 'api/posts-api';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchTagsPost } from '../posts-thunk';
import TagElement from './chip';

function PostFilters() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const { postTags } = useSelector((state) => state.posts);

    let tagsQuery = useMemo(() => {
        return queryString.parse(location.search).tags
            ? queryString.parse(location.search)?.tags?.split(' ')
            : [];
    }, [location.search]);

    useEffect(() => {
        if (postTags.length) return;
        (async () => {
            try {
                await dispatch(fetchTagsPost());
            } catch (error) {
                console.log(error);
            }
        })();
    }, [dispatch, postTags]);

    const handleOnclickTag = (tag) => {
        if (tagsQuery.includes(tag)) {
            tagsQuery = tagsQuery.filter((x) => x !== tag);
        } else {
            tagsQuery.push(tag);
        }

        if (tagsQuery.length === 0) {
            navigate('/posts');
        } else {
            navigate(`?tags=${tagsQuery.join('+')}`);
        }
    };

    const handleInputChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearch('');
        navigate(`?search=${search}`);
    };

    return (
        <>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            color: '#eee',
                            height: '2.2rem',
                            '& input': {},
                            '&:hover fieldset': {
                                borderColor: '#eee',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#eee',
                            },
                            '& fieldset': {
                                borderColor: '#eee',
                            },
                        },
                    }}
                    value={search}
                    onChange={handleInputChange}
                    placeholder="search"
                    fullWidth
                />
            </Box>
            <Stack mt={2} columnGap={1} rowGap={1} flexDirection="row" flexWrap="wrap">
                {postTags.map((tag) => (
                    <TagElement
                        key={tag}
                        tag={tag}
                        onClickTag={handleOnclickTag}
                        active={tagsQuery.includes(tag)}
                    />
                ))}
            </Stack>
        </>
    );
}

export default PostFilters;
