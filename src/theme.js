import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({

    palette: {
        // primary: {
        //     light: 'white',
        //     main: '#417505',
        //     dark: '#2B5101',
        //     contrastText: '#EEEEEE'
        // },
        // secondary: {
        //     light: '#888888',
        //     main: '#444444',
        //     dark: '#222222',
        //     contrastText: '#EEEEEE'
        // },
        // type: 'dark'
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
            root:{
                color:'white',
            },
            outlined: {
                border: '2px solid #FFBF5F'
            }
        },
        
        
        MuiInput: {
            input: {
                color:'white',
            }, 
            underline: {
                '&:after': {
                    borderBottomColor: `#fff`,
                    borderColor: 'fff',
                },
                '&:before': {
                    borderBottomColor: `rgba(255, 255, 255, 0.7)`,
                    borderColor:'rgba(255, 255, 255, 0.7)',
                }
            },

        }

    }
});

// for develop
if (process.env.NODE_ENV !== 'production') console.log(theme);

export default theme;