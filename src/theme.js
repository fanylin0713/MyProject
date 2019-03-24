import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({

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
        MuiInput: {
            focused: {
                borderBottom: '2px solid white',
            },

            underline: {
                '&:after': {
                    
                },
                '&:hover': {
                    borderBottom: '2px solid white',
                },
            },

            input: {
                color:'white',
            },

        }
    }
});

// for develop
if (process.env.NODE_ENV !== 'production') console.log(theme);

export default theme;