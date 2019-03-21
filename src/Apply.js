import React, { Component } from 'react';
import AppBar from './components/AppBar/AppBar'
import ApplyText from './components/ApplyText/ApplyText';
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
                姓名：
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
                備註：
                </div>
            </div>
            
        )
    }

}

export default Apply;