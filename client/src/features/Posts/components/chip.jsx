import { Chip } from '@mui/material';
import React from 'react';

function TagElement({ tag, onClickTag, active }) {
    const handleClick = () => {
        if (onClickTag) onClickTag(tag);
    };
    return (
        <Chip
            label={`#${tag}`}
            sx={{
                color: active ? '#000' : '#eee',
                bgcolor: active ? 'common.pink' : '',
                fontSize: '0.8rem',
                height: '28px',
                '&:hover': {
                    bgcolor: '#a96a81',
                },
            }}
            clickable
            onClick={handleClick}
            variant={active ? 'filled' : 'outlined'}
        />
    );
}

export default TagElement;
