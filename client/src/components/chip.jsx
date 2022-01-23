import { Chip } from '@mui/material';
import React from 'react';

function TagElement({ tag: { label, quantity }, onClickTag, active }) {
  const handleClick = () => {
    if (onClickTag) onClickTag(label.slice(label));
  };
  return (
    <Chip
      label={`#${label} (${quantity})`}
      sx={{
        color: active ? '#080710' : '#eee',
        bgcolor: active ? '#eee' : '',
        fontSize: '0.8rem',
        height: '28px',
        '&:hover': {
          bgcolor: '#b6b6b6',
        },
      }}
      clickable
      onClick={handleClick}
      variant={active ? 'filled' : 'outlined'}
    />
  );
}

export default TagElement;
