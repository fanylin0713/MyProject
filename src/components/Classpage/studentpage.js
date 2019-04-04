import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Upload from '@material-ui/icons/CreateNewFolderRounded';


const data = [
    { name: '', }
]

const style = theme => ({
    button: {
        backgroundColor: '#111B24',
        color: 'white',
    },
    UploadIcon: {
        marginRight: theme.spacing.unit * 1,
    }
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

export default Studentpage;
