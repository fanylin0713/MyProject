import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Todo from './Todo';

const styles = theme => ({
    input: {
        backgroudColor: '#212832',
    },
    button: {
    },
});

class Gradepage extends Component {

    // 建構子，每個 class 第一次產生時都會執行到這邊
    constructor(props) {
        super(props);

        // 這一行有點難解釋，想深入研究的麻煩自己查資料
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.removeTodo = this.removeTodo.bind(this);

        // 設定 state
        this.state = {
            todos: [
                { id: 1, name: 'hello', },
                { id: 2, name: 'aaaaaa', },
                { id: 3, name: 'world', }
            ]
        }
    }

    // input 改變，設定 value
    onChange(e) {
        this.setState({
            text: e.target.value
        })
    }

    onClick() {
        const { todos, text } = this.state;
        const newId = todos[todos.length - 1].id + 1;
        // 設定 state
        this.setState({
            text: '',
            todos: [
                ...todos,
                { id: newId, name: text }
            ]
        })
    }

    removeTodo(id) {
        const { todos } = this.state;

        // 直接用 filter 來把資料砍掉
        let newTodos = todos.filter((item) => item.id !== id);

        this.setState({
            todos: newTodos // 這個為什麼不寫成 todos: newTodos 呢?
        })
    }

    render() {

        // 從 state 取出資料
        const { todos, text } = this.state;
        const { classes } = this.props;

        return (
            <div>
                <div>
                    <TextField
                        value={text}
                        onChange={this.onChange}
                        className={classes.input}
                        margin="normal"
                        variant="outlined"
                    />
                    <Button className={classes.button} onClick={this.onClick}>新增成績</Button>
                    {/* <input className={classes.input} name="name" type="text" value={text} onChange={this.onChange} /> */}
                </div>
                {/* <button onClick={this.onClick}>Add item</button> */}
                {
                    todos.map((todo) => (
                        <Todo
                            id={todo.id}
                            name={todo.name}
                            remove={this.removeTodo} />
                    ))
                }
            </div>
        );
    }
}

export default withStyles(styles)(Gradepage);