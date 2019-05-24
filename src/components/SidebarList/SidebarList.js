import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { NavLink } from "react-router-dom";

//icon
import Moon from '@material-ui/icons/Brightness4';
//icon
import Applyicon from '@material-ui/icons/PersonAddOutlined';
import Rollcallicon from '@material-ui/icons/HowToRegOutlined';
import Classicon from '@material-ui/icons/FolderSharedOutlined';
import Teachericon from '@material-ui/icons/SchoolOutlined';
import Courseicon from '@material-ui/icons/LocalLibraryOutlined';
import Operationicon from '@material-ui/icons/SettingsOutlined';
import Makeupicon from '@material-ui/icons/DateRangeOutlined';
import Announceicon from '@material-ui/icons/AnnouncementOutlined';


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: "#111B24",
        color: 'white',
        height: '100%',
    },
    textcolor: {
        margin: '5px',
        color: "white",
    },
    headcolor:{
        color: "#111B24",
    },
    icon:{
        color:'white'
    }
});

// function ListItemLink(props) {
//     return <ListItem button component="a" {...props} />;
// }

function SimpleList(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <List component="nav" style={{ backgroundColor: "#FFBF5F" }}>
                <ListItem >
                    <ListItemIcon>
                        <Moon style={{ color: "#111B24", }} />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{
                        classes: {
                            root: classes.headcolor
                        }
                    }}primary="早安，晚點名" />
                </ListItem>
            </List>
            <Divider /> 
            <List component="nav" style={{ backgroundColor: "#111B24", }}>
                <NavLink style={{textDecoration:'none'}} activeClassName="active" to="/apply">
                <ListItem button>
                <Applyicon className={classes.icon}/>
                    <ListItemText primaryTypographyProps={{
                        classes: {
                            root: classes.textcolor
                        }
                    }} primary="報名" />
                </ListItem>
                </NavLink>

                <ListItem button>
                <Rollcallicon className={classes.icon}/>
                    <ListItemText primaryTypographyProps={{
                        classes: {
                            root: classes.textcolor
                        }
                    }} primary="點名" />
                </ListItem>

                <NavLink style={{textDecoration:'none'}} activeClassName="active" to="/class">
                <ListItem button>
                <Classicon className={classes.icon}/>
                    <ListItemText primaryTypographyProps={{
                        classes: {
                            root: classes.textcolor
                        }
                    }} primary="班級資料" />
                </ListItem>
                </NavLink>

                <NavLink style={{textDecoration:'none'}} activeClassName="active" to="/teacher">
                <ListItem button>
                <Teachericon className={classes.icon}/>
                    <ListItemText primaryTypographyProps={{
                        classes: {
                            root: classes.textcolor
                        }
                    }} primary="老師管理" />
                </ListItem>
                </NavLink>

                <NavLink style={{textDecoration:'none'}} activeClassName="active" to="/course">
                <ListItem button>
                <Courseicon className={classes.icon}/>
                    <ListItemText primaryTypographyProps={{
                        classes: {
                            root: classes.textcolor
                        }
                    }} primary="課程管理" />
                </ListItem>
                </NavLink>

                <NavLink style={{textDecoration:'none'}} activeClassName="active" to="/operation">
                <ListItem button>
                <Operationicon className={classes.icon}/>
                    <ListItemText primaryTypographyProps={{
                        classes: {
                            root: classes.textcolor
                        }
                    }} primary="營運狀態" />
                </ListItem>
                </NavLink>

                <NavLink style={{textDecoration:'none'}} activeClassName="active" to="/makeupclass">
                <ListItem button>
                <Makeupicon className={classes.icon}/>
                    <ListItemText primaryTypographyProps={{
                        classes: {
                            root: classes.textcolor
                        }
                    }} primary="補課管理" />
                </ListItem>
                </NavLink>

                <NavLink style={{textDecoration:'none'}} activeClassName="active" to="/announcment">
                <ListItem button>
                <Announceicon className={classes.icon}/>
                    <ListItemText primaryTypographyProps={{
                        classes: {
                            root: classes.textcolor
                        }
                    }} primary="公告" />
                </ListItem>
                </NavLink>
            </List>
        </div>
    );
}

SimpleList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleList);
