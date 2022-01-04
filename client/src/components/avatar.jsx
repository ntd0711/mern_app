import { Avatar } from '@mui/material';
import React from 'react';
import { BsFillPersonFill } from 'react-icons/bs';

function AvatarCustom({ url, size }) {
    return (
        <Avatar
            sx={{
                width: `${size}rem`,
                height: `${size}rem`,
                fontSize: `${size * 0.9}rem`,
                bgcolor: 'grey.400',
                color: '#fff',
            }}
            src={url}
        >
            {!url && <BsFillPersonFill style={{ marginTop: `${size * 0.35}rem` }} />}
        </Avatar>
    );
}

export default AvatarCustom;
