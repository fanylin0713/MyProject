import React, { Component } from 'react';
import AppBar from './components/AppBar/AppBar'
import ApplyText from './components/ApplyText/ApplyText';
import Button from './components/Button/Button';
import { Card } from '@material-ui/core';


class Apply extends React.Component {

    render() {

        return (
            <div style={{ backgroundColor: "#111B24", height: "1000px" }}>
                <AppBar />
                
                <Card style={{backgroundColor:"#212832", 
                                border:'1px white solid',
                                borderRadius:'10px',
                                width:'60%',
                                margin:'50px auto',
                                }}>
                <ApplyText />
                </Card>
                {/* <Button onClick={this.handleClick} type="org" style={{margin:'10px 0 0 290px'}}>Train</Button> */}
                {/* <Button onClick={this.handleClick} type="org">儲存</Button> */}
            </div>
        )
    }

}

export default Apply;