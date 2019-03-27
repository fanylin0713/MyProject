import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import SidebarList from '../SidebarList/SidebarList'


//icon
import SideBarIcon from '@material-ui/icons/NotesRounded';

const styles = {
  root:{
    
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  listcolor:{
    backgroundColor:'#111B24',
  }
};

class TemporaryDrawer extends React.Component {
  state = {
    open: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <SidebarList />
      </div>
    );

    return (
      <div className={classes.root} >
        <CssBaseline />
        <SideBarIcon onClick={this.toggleDrawer('left', true)} style={{fontSize:'40px'}}></SideBarIcon>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)} 
        PaperProps={{
          classes: {
            root: classes.listcolor
          }
        }}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);