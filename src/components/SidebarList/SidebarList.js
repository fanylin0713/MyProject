import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

//icon
import Moon from '@material-ui/icons/Brightness4';


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: "#111B24",
        color: 'white',
        height: '100%',
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
        <div className={classes.root}>
            <List component="nav" style={{ backgroundColor: "#FFBF5F" }}>
                <ListItem >
                    <ListItemIcon>
                        <Moon style={{ color: "#111B24", }} />
                    </ListItemIcon>
                    <ListItemText primary="早安，晚點名" />
                </ListItem>
            </List>
            <Divider /> 
            <List component="nav" style={{ backgroundColor: "#111B24", }}>
                <ListItem button>
                    <ListItemText primaryTypographyProps={{
                        classes: {
                            root: classes.textcolor
                        }
                    }} primary="報名" />
                </ListItem>

                <ListItem button>
                    <ListItemText primaryTypographyProps={{
                        classes: {
                            root: classes.textcolor
                        }
                    }} primary="點名" />
                </ListItem>

                <ListItem button>
                    <ListItemText primaryTypographyProps={{
                        classes: {
                            root: classes.textcolor
                        }
                    }} primary="班級資料" />
                </ListItem>

                <ListItem button>
                    <ListItemText primaryTypographyProps={{
                        classes: {
                            root: classes.textcolor
                        }
                    }} primary="老師管理" />
                </ListItem>

                <ListItem button>
                    <ListItemText primaryTypographyProps={{
                        classes: {
                            root: classes.textcolor
                        }
                    }} primary="課程管理" />
                </ListItem>

                <ListItem button>
                    <ListItemText primaryTypographyProps={{
                        classes: {
                            root: classes.textcolor
                        }
                    }} primary="營運狀態" />
                </ListItem>

                <ListItem button>
                    <ListItemText primaryTypographyProps={{
                        classes: {
                            root: classes.textcolor
                        }
                    }} primary="補課管理" />
                </ListItem>

                <ListItem button>
                    <ListItemText primaryTypographyProps={{
                        classes: {
                            root: classes.textcolor
                        }
                    }} primary="公告" />
                </ListItem>
            </List>
        </div>
    );
}

SimpleList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleList);
