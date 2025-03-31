import React from 'react';
import './App.css';
import App from "./App";
let url = 'https://dev.connorrichardson.co.uk/api.php?';
class Account extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            accountState: 0,
            accountBalance: 0,
            accountBudget: 0,
            accountName: ''
        };
    }
    render() {
        if ( this.state.accountState === 1){
            return <App accountName={this.state.accountName}
            accountBalance={this.state.accountBalance}
            accountBudget={this.state.accountBudget}/>;
        }
        return (
            <div className="App-header">
                <h1>Hello!</h1>
                <h1>Welcome to Budgie!</h1>
                <div className="start">

                    <p>Do you want to create an account?</p>
                    <p>or login?</p>
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

                </div>
                <div className="createAccount">
                    <form onSubmit={this.handleSubmitCreate}>
                        <input type="text" placeholder="Name" name="Name"/>
                        <input type="text" placeholder="Budget" name="budget"/>
                        <input type="email" placeholder="Example@Example.com" name="createEmail"/>
                        <input type="password" placeholder="Password" name="createPassword"/>
                        <input type="submit" value="Submit" name="createAcc"/>
                    </form>
                </div>
            </div>
        );


    }

    handleInput = async (evt) => {
        evt.preventDefault();
        const createButton = document.querySelector('#create');
        const loginButton = document.querySelector('#login');
        // Add event listeners for the buttons
        createButton.onclick = this.handleCreateAccount;
        loginButton.onclick = this.handleLogin;


    }
    handleSubmitCreate = async (evt) => {
        evt.preventDefault();
        let username = document.querySelector('input[name="createEmail"]').value;
        let password = document.querySelector('input[name="createPassword"]').value;
        let name = document.querySelector('input[name="Name"]').value;
        let budget = document.querySelector('input[name="budget"]').value;

        const accountData = {
            username: username,
            password: password,
            name: name,
            balance: 0,
            budget: budget
        }
        console.log(JSON.stringify(accountData));

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(accountData)
        })
            .then(response => {
                if (response.ok) {
                    return <Account/>
                }else {
                    throw new Error('Something went wrong');
                }
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });



    }

    handleSubmitLogin = async (evt) => {
        evt.preventDefault();


        let username = document.querySelector('input[name="Email"]').value;
        let password = document.querySelector('input[name="Password"]').value;
        url= url + 'username=' + username;
        try{
            const response = await fetch(url);
            const JsonData = await response.json();
            console.log(JsonData);
            this.setState({
                accountName: JsonData.Name,
                accountState: 1,
                accountBalance: JsonData.balance,
                accountBudget: JsonData.budget

            });
        } catch (error) {
            console.log(error);
        }



    }

    handleCreateAccount = () => {
        // Logic for creating an account
        document.querySelector('.start').style.display = 'none';
        document.querySelector('.createAccount').style.display = 'block';


    }

    handleLogin = () => {
        document.querySelector('.start').style.display = 'none';
        document.querySelector('.login').style.display = 'block';


        // Logic for handling login

    }
}

export default Account;