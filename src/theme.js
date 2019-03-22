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
  overrides:{
    underline: {
        '&:after': {
            
        }}
  }
});

// for develop
if (process.env.NODE_ENV !== 'production') console.log(theme);

export default theme;