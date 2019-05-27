import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    link:{
        color:'white',
        fontSize:'14pt',
        marginRight: theme.spacing.unit * 3,
    },
    btn:{
        color:'	#ff5151',
        border:'#ff5151 solid 1px',
    }

})

class Todo extends React.Component {

    constructor(props) {
        super(props);

        this.remove = this.remove.bind(this);
    }

    remove() {
        this.props.remove(this.props.id);
    }

    render() {
        const { name,classes,class_id } = this.props;

        return (
            <ul>
                {/* // 傳回 jsx */}

                <li>
                <NavLink className={classes.link} style={{textDecoration:'none',}} activeClassName="active" to={{pathname:'/grade', aboutProps:{name:name,class_id:class_id}}}>{name}</NavLink> <Button className={classes.btn} onClick={this.remove}>Delete</Button>
                {/* <NavLink className={classes.link} style={{textDecoration:'none',}} activeClassName="active" to="/grade">{name}</NavLink> <div className="btn btn-danger" onClick={this.remove}>Delete</div> */}
                </li>

            </ul>
            // <tr>
            //     <td>{name}</td>
            //     <td>
            //         <div className="btn btn-danger" onClick={this.remove}>Delete</div>
            //     </td>
            // </tr>
        );
    }
}

export default withStyles(styles)(Todo);