import { Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { postsApi } from 'api/posts-api';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchTagsPost } from '../posts-thunk';
import TagElement from './chip';

function PostFilters() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [tags, setTags] = useState(() => {
        return queryString.parse(location.search)?.tags?.split(' ') || [];
    });
    const [search, setSearch] = useState('');
    const { postTags } = useSelector((state) => state.posts);

    useEffect(() => {
        if (tags.length === 0) {
            navigate('/posts');
        } else {
            const queryTags = `?tags=${tags.join('+')}`;
            navigate(queryTags);
        }
    }, [tags, navigate]);

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
        if (tags.includes(tag)) {
            setTags(tags.filter((x) => x !== tag));
        } else {
            setTags([...tags, tag]);
        }
    };

    const handleInputChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearch('');
        navigate(`?search=${search}`);
        console.log(search);
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
                        active={tags.includes(tag)}
                    />
                ))}
            </Stack>
        </>
    );
}

export default PostFilters;
