import React, { PureComponent } from 'react'

export default class UploadFile extends PureComponent {
    state = {
        name: '',
        path: '',
        preview: null,
        data: null
    }

    changeName = (e) => {
        this.setState({ name: e.target.value })
    }

    //选择文件
    changePath = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }

        let src,preview,type=file.type;

        // 匹配类型为image/开头的字符串
        src = URL.createObjectURL(file)
        preview = <img src={src} alt='' />
        
 

        this.setState({ path: file.name, data: file, preview: preview })
    }

    // 上传文件
    upload = () => {
        
        const data = this.state.data;
        if (!data) {
            console.log('未选择文件');
            return;
        }

        //此处的url应该是服务端提供的上传文件api 
        const url = 'http://localhost:3000/api/upload';
        const form = new FormData();

        //此处的file字段由上传的api决定，可以是其它值
        form.append('file', data);

        fetch(url, {
            method: 'POST',
            body: form
        }).then(res => {
            console.log(res)
        })
    }

    //关闭模态框
    cancel = () => {
        this.props.closeOverlay();
    }

    render() {
        const { name, path, preview } = this.state;
        return (
            <div>
                
                <div className='row'>
                    
                    <div className='row-input'>
                        <span>{path ? path : '請選擇文件路徑'}</span>
                        <input type='file' accept='video/*,image/*,text/plain' onChange={this.changePath} />
                    </div>
                </div>
                <div className='media'>
                    {preview}
                </div>
                {/* <button className='primary upload' onClick={this.upload}>上傳</button>
                <button className='primary cancel' onClick={this.cancel}>取消</button> */}
            </div>
        )
    }
}
