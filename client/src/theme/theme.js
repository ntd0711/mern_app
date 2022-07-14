import { createTheme } from '@mui/material';

// dark : #222831
// light daek: #393E46
// white: #eee
// grey-blue: #00ADB5
// blue: #00c7d0
//// blue: #00FFF5
// pink: #ffa7c4
export const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      mobileL: 425,
      tablet: 768,
      laptop: 1024,
      desktop: 1280,
    },
  },
  palette: {
    common: {
      grey_white: '#eee',
      white: '#f9f9f9',

      black: '#000',

      blue: '#00c7d0',
      dark_blue: '#00eee5',

      light_dark: '#393E46',
      dark: '#222831',

      pink: '#ffa7c4',
    },
  },
  typography: {
    fontFamily: 'Muli, sans-serif',
    // body1: {
    //   fontSize: '0.925rem',
    // },
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
          fontSize: '26px',
        },
        subtitle2: {
          fontWeight: 500,
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
          boxShadow: '0 0 10px rgba(8,7,16,0.6)',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          fontWeight: 600,
          backgroundColor: '#eee',
          color: '#080710',
          '&:hover': {
            backgroundColor: '#b6b6b6',
          },
        },
        containedSizeLarge: {
          padding: '15px 0',
          fontSize: '18px',
        },

        containedSecondary: {
          fontWeight: 600,
          backgroundColor: 'rgba(255,255,255,0.05)',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.02)',
          },
        },
      },
    },

    MuiContainer: {
      // defaultProps: {
      //   maxWidth: 'md',
      // },
      // styleOverrides: {
      //   maxWidthMd: {
      //     maxWidth: '780px',
      //     '@media (min-width: 780px)': {
      //       maxWidth: '780px',
      //     },
      //   },
      // },
      styleOverrides: {
        root: {
          padding: 0,
          '@media (min-width: 0px)': {
            maxWidth: '90vw',
          },
          '@media (min-width: 425px)': {
            padding: '0 5%',
            maxWidth: '1440px',
          },
          '@media (min-width: 768px)': {
            padding: '0 15%',
          },
          '@media (min-width: 1280px)': {
            padding: '0 20%',
          },
        },
      },
    },
  },
});
