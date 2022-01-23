import { createTheme } from '@mui/material';

// dark : #222831
// light daek: #393E46
// white: #eee
// grey-blue: #00ADB5
// blue: #00c7d0
//// blue: #00FFF5
// pink: #ffa7c4
export const theme = createTheme({
  palette: {
    common: {
      grey_white: '#eee',
      white: '#f9f9f9',
      black: '#000',
      blue: '#00c7d0',
      dark_blue: '#00eee5',
      light_dark: '#393E46',
      dark: '#222831',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    body1: {
      fontSize: '0.925rem',
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        color: '#eee',
      },
      variants: [
        {
          props: { caption: 'small' },
          style: {
            fontSize: '11px',
          },
        },
      ],
      styleOverrides: {
        h5: {
          fontSize: '28px',
        },
      },
    },

    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: '#222831',
          border: '2px solid rgba(255,255,255,0.1)',
          boxShadow: '0 0 10px rgba(8,7,16,0.6)',
        },
      },
    },

    MuiButton: {
      variants: [
        {
          props: { color_custom: 'pink' },
          style: {
            borderColor: '#ed8fb2',
            color: '#ed8fb2',
            '&:hover': {
              borderColor: '#ed8fb2',
              backgroundColor: 'transparent',
            },
          },
        },
      ],
    },

    MuiContainer: {
      defaultProps: {
        maxWidth: 'md',
      },

      styleOverrides: {
        maxWidthMd: {
          maxWidth: '780px',
          '@media (min-width: 780px)': {
            maxWidth: '780px',
          },
        },
      },
    },
  },
});
