import React from 'react';
import './App.css';
import App from "./App";
let url = 'https://dev.connorrichardson.co.uk/api.php';
class Account extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            accountState: 0,
            accountBalance: 0,
            accountBudget: 0,
            accountName: '',
            accountSpent: 0,
            accountIncome: 0
        };
    }
    render() {
        if ( this.state.accountState === 1){
            url = 'https://dev.connorrichardson.co.uk/api.php';//reset api request url
            return <App accountName={this.state.accountName}
            accountBalance={this.state.accountBalance}
            accountBudget={this.state.accountBudget}
            accountUsername = {this.state.accountUsername}
            accountSpent = {this.state.accountSpent}
            accountIncome = {this.state.accountIncome}/>;
        }
        else if (this.state.accountState === 2){
            return <Account/>;
        }

        return (
            <div className="App-headera">
                <h1>Welcome to Budgie!</h1>
                <div className="start">
                    <p>Please Login or create an account to get started</p>
                    <form onSubmit={this.handleInput}>
                        <button id="create">Create account</button>
                        <button id="login">Login</button>
                    </form>
                </div>
                <div className="login">
                    <form onSubmit={this.handleSubmitLogin}>
                        <input type="email" placeholder="Example@Example.com" name="Email"/>
                        <input type="password" placeholder="Password" name="Password"/>
                        <input type="submit" value="Submit"/>
                    </form>
                    <p id="unpw">Incorrect Username or password!</p>
                    <button id="back" onClick={this.goBack}>Back</button>
                </div>
                <div className="createAccount">
                    <form onSubmit={this.handleSubmitCreate}>
                        <input type="text" placeholder="Name" name="Name"/>
                        <input type="text" placeholder="Budget" name="budget"/>
                        <input type="email" placeholder="Example@Example.com" name="createEmail"/>
                        <input type="password" placeholder="Password" name="createPassword"/>
                        <input type="submit" value="Submit" name="createAcc"/>
                    </form>
                    <p id="acc">Already have an account</p>
                    <button id="back" onClick={this.goBack}>Back</button>
                </div>
            </div>
        );


    }
    goBack = () => {
       this.setState({
           accountState: 2
       })
    }
    handleInput = async (evt) => {
        evt.preventDefault();
        const createButton = document.querySelector('#create');
        const loginButton = document.querySelector('#login');
        createButton.onclick = this.handleCreateAccount;
        loginButton.onclick = this.handleLogin;
    }
    handleSubmitCreate = async (evt) => {
        evt.preventDefault();
        let username = document.querySelector('input[name="createEmail"]').value;
        let password = document.querySelector('input[name="createPassword"]').value;
        let name = document.querySelector('input[name="Name"]').value;
        let budget = document.querySelector('input[name="budget"]').value;

        let accountData = {
            username: username,
            password: password,
            name: name,
            balance: 0,
            budget: budget
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(accountData)
        })
            .then(response => {
                if (response.ok) {
                   return response.json();
                }else {
                    throw new Error('Something went wrong');
                }
            })
            .then(data => {
                if (data.error){
                    document.querySelector('#acc').style.display = 'block';
                }else{
                    this.setState({
                            accountState: 2
                        }
                    )
                }

            })
            .catch(error => {
                console.log(error);
            });

    }

    handleSubmitLogin = async (evt) => {
        evt.preventDefault();
        let username = document.querySelector('input[name="Email"]').value;
        let password = document.querySelector('input[name="Password"]').value;
        url= url +'?username=' + username + '&password=' + password;
        try{
            let response = await fetch(url);
            let JsonData = await response.json();
            if (JsonData.error){
                document.querySelector('#unpw').style.display = 'block';

            }else {
                this.setState({
                    accountName: JsonData.Name,
                    accountUsername: JsonData.username,
                    accountState: 1,
                    accountBalance: JsonData.balance,
                    accountBudget: JsonData.budget,
                    accountSpent: JsonData.spent,
                    accountIncome: JsonData.tot_income

                });
            }

        } catch (error) {
            console.log(error);
        }



    }

    handleCreateAccount = () => {
        document.querySelector('.start').style.display = 'none';
        document.querySelector('.createAccount').style.display = 'block';
    }

    handleLogin = () => {
        document.querySelector('.start').style.display = 'none';
        document.querySelector('.login').style.display = 'block';
    }
}

export default Account;