import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Upload from '@material-ui/icons/CreateNewFolderRounded';
import { withStyles } from '@material-ui/core/styles';
import { fromJS, List, Map } from 'immutable'

const data = [
    // { name: '', }
]

const styles = theme => ({
    button: {
        backgroundColor: '#111B24',
        color: 'white',
    },
    UploadIcon: {
        margin:'0 auto',
    },
    input: {
        display: 'none',
    },
});

class Studentpage extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div style={{ borderColor: '#FFBF5F' }}>
                {
                    data.length ?
                        <ul>
                            {data.map((el, index) => (
                                <li key={index}>{el.name}</li>
                            ))}
                        </ul> :
                        <div>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" component="span" className={classes.button}>
                                    <Upload className={classes.UploadIcon} />
                                    匯入學生資料
                        </Button>
                            </label>
                        </div>
                }
            </div>
        );
    }
}

export default withStyles(styles)(Studentpage);
