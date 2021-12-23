import { createTheme } from '@mui/material';

// Create a theme instance.
export const theme = createTheme({
    palette: {
        common: {
            white: '#f9f9f9',
            black: '#000',
        },
    },
    typography: {
        fontFamily: '-apple-system, sans-serif',
    },
    components: {
        MuiTypography: {
            defaultProps: {
                // color: '#352f44',
            },
        },
        MuiContainer: {
            defaultProps: {
                maxWidth: 'md',
            },
            styleOverrides: {
                maxWidthMd: {
                    maxWidth: '800px',
                    '@media (min-width: 800px)': {
                        maxWidth: '800px',
                    },
                },
            },
        },
    },
});

// palette: {
//     common: {
//         black: '#142850',
//     },
//     primary: {
//         main: '#FF6464',
//     },
//     secondary: {
//         main: '#00A8CC',
//     },
//     text: {
//         primary: '#21243D',
//         secondary: '',
//         // disabled: '#8695A4',
//     },
//     background: {
//         paper: '#EDF7FA',
//     },
//     grey: {
//         50: '#8695A4',
//     },
// },

// typography: {
//     fontFamily: '-apple-system, sans-serif',
// },
// components: {
//     MuiContainer: {
//         defaultProps: {
//             maxWidth: 'md',
//         },
//         styleOverrides: {
//             maxWidthMd: {
//                 maxWidth: '860px',
//                 '@media (min-width: 900px)': {
//                     maxWidth: '860px',
//                 },
//             },
//             maxWidthSm: {
//                 maxWidth: '680px',
//                 padding: '0 18px',
//                 '@media (min-width: 600px)': {
//                     maxWidth: '680px',
//                 },
//             },
//         },
//     },
//     MuiLink: {
//         defaultProps: {
//             underline: 'hover',
//         },
//         styleOverrides: {
//             root: {
//                 color: 'black',
//                 '&:hover': {
//                     color: '#ed4956',
//                 },
//                 '&.active': {
//                     color: '#ed4956',
//                 },
//             },
//         },
//     },
//     MuiButton: {
//         variants: [
//             {
//                 props: { variant: 'contained' },
//                 style: { color: 'white' },
//             },
//         ],
//     },
// },
