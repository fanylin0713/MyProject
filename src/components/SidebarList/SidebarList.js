import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

//icon
import Moon from '@material-ui/icons/Brightness2';


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        color: 'white',
        height: 'auto',
    },
    textcolor: {
        color: "white",
    }
});

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function SimpleList(props) {
    const { classes } = props;
    return (
        <div className={classes.root} style={{ backgroundColor: "#111B24" }} >
            <List component="nav" style={{ backgroundColor: "#FFBF5F" }}>
                <ListItem className={classes.textcolor} button>
                    <ListItemIcon>
                        <Moon style={{ color: "#FFBF5F", }} />
                    </ListItemIcon>
                    <ListItemText primary="早安，晚點名" />
                </ListItem>
            </List>
            <Divider /> 
            <List component="nav">
                <ListItem button>
                    <ListItemText primary="報名" />
                </ListItem>

                <ListItem button>
                    <ListItemText primary="點名" />
                </ListItem>

                <ListItem button>
                    <ListItemText primary="班級資料" />
                </ListItem>

                <ListItem button>
                    <ListItemText primary="老師管理" />
                </ListItem>

                <ListItem button>
                    <ListItemText primary="課程管理" />
                </ListItem>

                <ListItem button>
                    <ListItemText primary="營運狀態" />
                </ListItem>

                <ListItem button>
                    <ListItemText primary="補課管理" />
                </ListItem>

                <ListItem button>
                    <ListItemText primary="公告" />
                </ListItem>
            </List>
        </div>
    );
}

SimpleList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleList);
