import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Airtable from 'airtable';
import Todo from './Todo';

const TABLE_NAME = 'TestScore';
const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const table = base(TABLE_NAME);

let counter = 0;
function createData(name) {
  counter += 1;
  return { id: counter, name};
}

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
                // { id: 1, name: '10/2 國文第一課', },
                // { id: 2, name: '10/9 國文第二課', },
                // { id: 3, name: '10/16 國文第三課', }
            ],
        }
    }


    componentDidMount(){
        table.select({
            view: "Grid view"
            }).eachPage((records, fetchNextPage) => {
                this.setState({records});
            //   const class_id = this.state.records.map((record, index) => record.fields['class_id']);
            //   const test_score = this.state.records.map((record, index) => record.fields['test_score']);
            //   const test_rank = this.state.records.map((record, index) => record.fields['test_rank']);
                const test_name = this.state.records.map((record, index) => record.fields['test_name']);
                const test_date = this.state.records.map((record, index) => record.fields['test_date']);
                const record_id = this.state.records.map((record, index) => record.id);
        
                var temp=[];
                var temp2=[];
                for(var index = 0; index < test_name.length; index++) {
                    temp.push(test_date[index] +" "+ test_name[index]);
                }
                var classResult = temp.filter(function(element, index, arr){
                    return arr.indexOf(element) === index;
                });
                for(var index = 0; index < classResult.length; index++){
                    temp2.push(createData(classResult[index]));
                }
                this.setState({ todos : temp2 });
              fetchNextPage(); 
            }
            );
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
                            key={todo.id}
                            id={todo.id}
                            name={todo.name}
                            class_id={this.props.class_id}
                            remove={this.removeTodo} />
                    ))
                }
            </div>
        );
    }
}

export default withStyles(styles)(Gradepage);