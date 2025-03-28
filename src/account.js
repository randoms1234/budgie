import React from 'react';
import './App.css';
import App from "./App";
class Account extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            accountState: 0,
            accountBalance: 0,
            accountName: ''
        };
    }
    render() {
        if ( this.state.accountState === 1){
            return <App accountName={this.state.accountName}/>;
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
                    <form onSubmit={this.handleSubmit}>
                        <input type="email" placeholder="Example@Example.com" name="Email"/>
                        <input type="password" placeholder="Password" name="Password"/>
                        <input type="submit" value="Submit"/>
                    </form>

                </div>
                <div className="createAccount">
                    <form onSubmit={this.handleSubmit}>
                        <input type="email" placeholder="Example@Example.com" name="Email"/>
                        <input type="password" placeholder="Password" name="Password"/>
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

    handleSubmit = async (evt) => {
        evt.preventDefault();



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