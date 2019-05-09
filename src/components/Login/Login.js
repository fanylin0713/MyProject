import React from 'react';
import Header from '../LoginHeader/LoginHeader';
import Account from './LoginAccount';
import Area from './LoginArea';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    head: {
        height : 200,
        marginTop: theme.spacing.unit * 6,
    },
    left: {
        float: "left",
        width: '40%',
        marginTop: theme.spacing.unit * 3,
        marginLeft: "15%",
    },
    right: {
        float: "right",
        width: '37%',
        marginTop: theme.spacing.unit * 6,
    },
});
class Login extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div className={classes.head}>
                    <Header />
                </div>
                <div className={classes.left}>
                    <Area />
                </div>
                <div className={classes.right}>
                    <Account />
                </div>
            </div>
        )
    }

}

export default withStyles(styles)(Login);