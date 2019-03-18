import React from 'react'

export default class LifeCycle extends React.Component {
    state = {
        message: 'React!'
    }
    
    componentDidMount() {
        console.log('componentDidMount')
    }

    componentDidUpdate() {
        console.log('updated!')
    }

    handleClick = () => {
        this.setState({
            message: 'Clicked!'
        })
    }

    render() {
        console.log('render')
        return (
            <div onClick={this.handleClick}>{this.props.data}</div>
        )
    }
}

// export const LifeCycle = () => {
//     return (
//         <div>123</div>
//     )
// }

