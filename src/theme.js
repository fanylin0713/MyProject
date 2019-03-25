import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({

    palette: {
        primary: {
            light: 'white',
            main: '#417505',
            dark: '#2B5101',
            contrastText: '#EEEEEE'
        },
        // secondary: {
        //     light: '#888888',
        //     main: '#444444',
        //     dark: '#222222',
        //     contrastText: '#EEEEEE'
        // },
        type: 'dark'
    },

    typography: {
        useNextVariants: true,
        fontFamily: [
            '"Roboto"',
            '"Helvetica"',
            '"Arial"',
            'sans-serif',
            '"Microsoft JhengHei"'
        ].join(',')
    },
    overrides: {
        MuiButton:{
            

        },
        MuiInput: {
            // focused: {
            //     borderBottom: '2px solid white',
            // },

            underline: {
                '&:after': {
                    // transition: theme.transitions.create('transform', {
                    //     duration: theme.transitions.duration.shorter,
                    //     easing: theme.transitions.easing.easeOut,
                    // }),
                },

                '&:hover': {
                    borderBottom: '',
                },

                '&:before': {

                }
            },

            // input: {
            //     color: 'white',
            // },

        }
    }
});

// for develop
if (process.env.NODE_ENV !== 'production') console.log(theme);

export default theme;