import React, { Component } from 'react';

const data = [{
    name: 'name'
}]

class Gradepage extends Component {
    render() {
        if (data.length) {
            return (
            <div>
                <div>title</div>
                <ul>
                    {data.map((el, index) => (
                        <li key={index}>{el.name}</li>
                    ))}
                </ul>    
            </div>
            )
        }
        return (
            <div>
                <div>title</div>
                新增資料 
            </div>
        );
        // return (
        //     <div>
        //         <div>title</div>
        //         {
        //             data.length ? 
        //             <ul>
        //                 {data.map((el, index) => (
        //                     <li key={index}>{el.name}</li>
        //                 ))}
        //             </ul> :
        //             '新增資料'
        //         }    
        //     </div>
        // );
    }
}

export default Gradepage;
