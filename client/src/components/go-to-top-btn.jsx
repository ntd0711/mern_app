import { IconButton } from '@mui/material';
import useScroll from 'hooks/use-scroll';
import React from 'react';

function GoToTopBtn({ pageYOffset }) {
  const isVisible = useScroll({ pageYOffset });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <IconButton
        sx={{
          fontSize: '3rem',
          position: 'fixed',
          right: '4rem',
          bottom: '3rem',
          transition: 'transform 0.4s ease',
          transform: `${isVisible ? 'scale(1)' : 'scale(0)'}`,
          color: 'common.dark_blue',
        }}
        onClick={scrollToTop}
      >
        <i className="bx bx-chevron-up"></i>
      </IconButton>
    </>
  );
}

export default GoToTopBtn;
