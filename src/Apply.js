import React, { Component } from 'react';
import AppBar from './components/AppBar/AppBar'
import ApplyText1 from './components/ApplyText/ApplyText1';
import Button from './components/Button/Button';
import DatePicker from './components/DatePicker/DatePicker'
import StudentPhoto from './components/Cards/StudentPhoto';


class Apply extends React.Component {
    
    render() {
        
        return (
            
        <div style={{ backgroundColor: "#111B24" , height:"1000px"}}>
                <AppBar />
                <div style={{float:'left',width:'40%',padding:'4%'}}>
                <StudentPhoto />
                
                <Button onClick={this.handleClick} type="org">Train</Button>
                </div>
                
                <div style={{float:'right',color:'white',width:'60%',padding:'4% 0',fontSize:'20pt'}}>
                <ApplyText1 />
                {/* 姓名：
                <ApplyText type="org"/>
                <br />
                生日：
                <DatePicker />
                學校：
                <ApplyText type="org"/>
                <br />
                班別：
                <ApplyText type="small"/>
                <br />
                備註： */}
                <Button onClick={this.handleClick} type="org">儲存</Button>
                </div>
            </div>
            
        )
    }

}

export default Apply;