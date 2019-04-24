import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';


import pin from './pin.png';
import Drawer from '../Drawer/Drawer';

//icon
import SearchIcon from '@material-ui/icons/Search';
import Home from '@material-ui/icons/HomeRounded';
import LogoutIcon from '@material-ui/icons/DirectionsWalkOutlined';
import Face from '@material-ui/icons/FaceOutlined';
import { NavLink } from "react-router-dom";

const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 6,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },

    button: {
        color: "white",
    },

    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 5,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 90,
            '&:focus': {
                width: 120,
            },
        },
    },

    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
});

class SearchAppBar extends React.Component {

    state = {
        open: false,
        area: '',
    };

    handleChange = name => event => {
        this.setState({ [name]: Number(event.target.value) });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };


    render() {

        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static" style={{ backgroundColor: '#111B24' }}>
                    <Toolbar>
                        {/* <SideBarIcon className={classes.menuButton} onClick={this.toggleDrawer('left', true)} /> */}
                        <Drawer />
                        <img src={pin} height="26" alt="location"></img>
                        {/* <Selector /> */}
                        {/* 校區選擇 */}
                        <div>
                            <Button onClick={this.handleClickOpen}>北投校區</Button>
                            <Dialog
                                disableBackdropClick
                                disableEscapeKeyDown
                                open={this.state.open}
                                onClose={this.handleClose}
                            >
                                <DialogTitle>選擇校區</DialogTitle>
                                <DialogContent>
                                    <form className={classes.container}>
                                        <FormControl className={classes.formControl}>
                                            <Select
                                                value={this.state.area}
                                                onChange={this.handleChange('area')}
                                                input={<Input id="area-simple" />}
                                            >
                                                <MenuItem value="">
                                                    <em>校區</em>
                                                </MenuItem>
                                                <MenuItem value={10}>北投校區</MenuItem>
                                                <MenuItem value={20}>士林校區</MenuItem>
                                                <MenuItem value={30}>南港校區</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </form>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={this.handleClose} color="primary">
                                        Ok
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        {/* 校區選擇 */}
                        <NavLink activeClassName="active" to="/">
                            <Button className={classes.button}><Home /></Button></NavLink>
                        <Button className={classes.button}><Face /></Button>
                        <NavLink style={{ textDecoration: 'none' }} activeClassName="active" to="/login">
                            <Button className={classes.button}>
                                <LogoutIcon className={classes.rightIcon} />
                                Log out
                            </Button>
                        </NavLink>
                        <div className={classes.grow} />
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="學號查詢…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}


SearchAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchAppBar);