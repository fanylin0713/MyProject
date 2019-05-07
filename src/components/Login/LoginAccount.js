import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import '../Login/Login.css';
import TextField from '@material-ui/core/TextField';
import Airtable from 'airtable';

const TABLE_NAME = 'Account';
const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const table = base(TABLE_NAME);

const styles = theme => ({
    container: {
    },
    textField: {
        width: 240,
        marginLeft: theme.spacing.unit,
        // marginRight: theme.spacing.unit,
    },
});

function createData(account_id, account_passwd) {
    return { account_id, account_passwd };
}

class OutlinedTextFields extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            account: "",
            password: "",
            userData: [],
            error: false,
            errorMessage: '',
            enter:false,
        };
    }
    
    componentDidMount() {
        table.select({
            //filterByFormula: 'AND(student_id = 405401369)',
            view: "Grid view"
        }).eachPage((records, fetchNextPage) => {
            this.setState({ records });
            console.log(records);
            const account_id = this.state.records.map((record, index) => record.fields['account_id']);
            const account_passwd = this.state.records.map((record, index) => record.fields['account_passwd']);
            // This function (`page`) will get called for each page of records.
            var count = account_id.length;
            var temp = [];
            for (var index = 0; index < count; index++) {
                temp.push(createData(account_id[index], account_passwd[index]));

            }
            this.setState({ userData: temp });
            fetchNextPage();
        }
        );
    }

    validateForm() {
        return this.state.account.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state.account);
        console.log(this.state.userData);

        for (var index = 0; index < this.state.userData.length; index++) {
            if (this.state.account === this.state.userData[index].account_id &&
                this.state.password === this.state.userData[index].account_passwd) {
                    console.log("enter");
                    this.setState({enter: true});
                    this.props.history.replace('/')
            } else {
                this.setState({
                    error: true,
                    errorMessage:'帳號密碼錯誤'
                })
            }

        }
    }

    render() {
        const { error, errorMessage } = this.state
        const { classes } = this.props;

        return (
            <form onSubmit={this.handleSubmit} className={classes.container} noValidate autoComplete="off">
                <div>
                    <TextField
                        required
                        //id="outlined-required"
                        id='account'
                        label="帳號"
                        error={error}
                        helperText={errorMessage}
                        value={this.state.account}
                        onChange={this.handleChange}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    /></div>
                <div>
                    <TextField
                        //id="outlined-password-input"
                        id='password'
                        label="密碼"
                        value={this.state.password}
                        className={classes.textField}
                        onChange={this.handleChange}
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                    /></div>
                <div>
                    <button className="btn login-btn" type="submit" name="loginbutton" disabled={!this.validateForm()}>
                        <span>Log in</span>
                    </button>
                </div>
            </form>
        );
    }
}

OutlinedTextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles),
    withRouter
)(OutlinedTextFields);
