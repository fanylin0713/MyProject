import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Gradepage from './Gradepage';
import Progresspage from './Progresspage';
import Studentpage from './Studentpage';



function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

function LinkTab(props) {
    return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#212832',
        width: '90%',
        margin: 'auto',
        minWidth:'900px',
    },

    tabs: {
        backgroundColor: '#FFBF5F',
        color: '#111B24',
    }

});

class NavTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <NoSsr>
                <div className={classes.root} >
                    <AppBar position="static">
                        <Tabs className={classes.tabs} variant="fullWidth" value={value} onChange={this.handleChange}>
                            <LinkTab style={{ fontSize:'14pt', textDecoration: 'none' }} label="成績" href="page1" />
                            <LinkTab style={{ fontSize:'14pt', textDecoration: 'none' }} label="教學進度" href="page2" />
                            <LinkTab style={{ fontSize:'14pt', textDecoration: 'none' }} label="學生資料" href="page3" />
                        </Tabs>
                    </AppBar>
                    {value === 0 && <TabContainer><Gradepage /></TabContainer>}
                    {value === 1 && <TabContainer><Progresspage /></TabContainer>}
                    {value === 2 && <TabContainer><Studentpage /></TabContainer>}
                </div>
            </NoSsr>
        );
    }
}

NavTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavTabs);
