import { IconButton } from '@mui/material';
import useScroll from 'hooks/use-scroll';
import React, { useEffect, useState } from 'react';

function GoToTopBtn() {
  const isVisible = useScroll({ pageYOffset: 400 });

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
          bottom: '-4rem',
          transition: 'transform 0.4s ease',
          transform: `${isVisible ? 'translateY(-7rem)' : ''}`,
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
