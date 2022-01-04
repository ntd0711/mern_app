import { createTheme } from '@mui/material';

// Create a theme instance.
export const theme = createTheme({
    palette: {
        // primary: {
        //     main: '#eee',
        //     dark: '#ed8fb2',
        //     pink: '#ed8fb2',
        // },
        common: {
            white: '#f9f9f9',
            black: '#000',
            pink: '#ed8fb2',
            text_white: '#eee',
        },
        // text: {
        //     primary: 'rgba(0,0,0,0.87)',
        //     secondary: '#ed8fb2',
        //     disabled: '',
        // },
    },
    typography: {
        fontFamily: 'Poppins, sans-serif',
        body1: {
            fontSize: '0.925rem',
        },
    },
    components: {
        MuiTypography: {
            // variants: [
            //     {
            //         props: { pointer },
            //         style: { cursor: 'pointer' },
            //     },
            // ],
            defaultProps: {
                color: '#eee',
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
