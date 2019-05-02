import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Upload from '@material-ui/icons/CreateNewFolderRounded';
import { withStyles } from '@material-ui/core/styles';
import { fromJS, List, Map } from 'immutable'
import XLSX from 'xlsx';

const styles = theme => ({
    button: {
        backgroundColor: '#111B24',
        color: 'white',
    },
    UploadIcon: {
        margin: '0 auto',
    },
    input: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        outline: 'none',
        opacity: 0,
    },
});

class Progresspage extends Component {
    onImportExcel = file => {
        const { files } = file.target;
        const fileReader = new FileReader();
        fileReader.onload = event => {
            try {
                const { result } = event.target;
                const workbook = XLSX.read(result, { type: 'binary' });
                let data = [];
                for (const sheet in workbook.Sheets) {
                    if (workbook.Sheets.hasOwnProperty(sheet)) {
                        data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                        // break;
                    }
                }
                console.log(data);
                console.log(data[0]);
                console.log(data[0].date);
                console.log(data[0].origin);
            } catch (e) {
                // message.error('文件類型不正确！');
            }
        };
        fileReader.readAsBinaryString(files[0]);
    }
    render() {
        const { classes } = this.props;
        return (
            <div style={{ borderColor: '#FFBF5F' }}>
                <Button className={classes.button}>
                    <Upload type='upload' />
                    <input className={classes.input} type='file' accept='.xlsx, .xls' onChange={this.onImportExcel} />
                    <span>匯入教學進度</span>
                </Button>

                {/* {
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
                } */}
            </div>
        );
    }
}

export default withStyles(styles)(Progresspage);
