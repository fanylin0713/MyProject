import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Upload from '@material-ui/icons/CreateNewFolderRounded';
import { withStyles } from '@material-ui/core/styles';
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

// const data = [
//     { name: 'name', }
// ]

class Gradepage extends Component {
    onImportExcel = file => {
        // 獲取上傳的文件對象
        const { files } = file.target;
        // 通過FileReader讀取文件
        const fileReader = new FileReader();
        fileReader.onload = event => {
            try {
                const { result } = event.target;
                // 以二進制方式讀取得到整份excel表格
                const workbook = XLSX.read(result, { type: 'binary' });
                // 儲存獲取到的數據
                let data = [];
                // 對每張工作表行行讀取（這裡預設只讀取第一張表）
                for (const sheet in workbook.Sheets) {
                    // esline-disable-next-line
                    if (workbook.Sheets.hasOwnProperty(sheet)) {
                        // 利用 sheet_to_json 方法將 excel 轉成 json 數據
                        data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                        // break; // 如果只取第一張表，就取消注解
                    }
                }
                // 最終獲取到且格式化的 json 數據
                // message.success('上傳成功！')
                console.log(data);
            } catch (e) {
                // 文件類型錯誤出現
                // message.error('文件類型不正确！');
            }
        };
        // 以二進制方式打開文件
        fileReader.readAsBinaryString(files[0]);
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <div>
                    <Button className={classes.button}>
                        <Upload type='upload' />
                        <input className={classes.input} type='file' accept='.xlsx, .xls' onChange={this.onImportExcel} />
                        <span>上傳成績</span>
                    </Button>
                    <p >支持 .xlsx、.xls 格式的文件</p>
                </div >
                {/* <input
                    input type='file'
                    accept='.xlsx, .xls'
                    onChange={this.onImportExcel}
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span" className={classes.button}>
                        <Upload className={classes.UploadIcon} />
                        匯入學生資料
                        </Button>
                </label> */}
                {/* {
                    data.length ? 
                    <ul>
                        {data.map((el, index) => (
                            <li key={index}>{el.name}</li>
                            ))}
                    </ul> :
                    '新增資料'
                }     */}
            </div>
        );
    }
}

export default withStyles(styles)(Gradepage);
