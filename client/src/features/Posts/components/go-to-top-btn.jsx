import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

function GoToTopBtn() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      <IconButton
        sx={{
          fontSize: '2.4rem',
          position: 'fixed',
          right: '4rem',
          bottom: '-4rem',
          transition: 'transform 0.4s ease',
          transform: `${isVisible ? 'translateY(-7rem)' : ''}`,
          color: 'common.dark_blue',
        }}
        onClick={scrollToTop}
      >
        <IoIosArrowUp />
      </IconButton>
    </>
  );
}

export default GoToTopBtn;
