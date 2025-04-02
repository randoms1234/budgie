import React from 'react';
import './App.css';
import Result from "./Result.js"
import Account from "./account.js"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountBudget: this.props.accountBudget,
            accountUsername: this.props.accountUsername,
            accountBalance: this.props.accountBalance,
            spendamt: '',
        };
    }

    render =() =>{
         const accountName = this.props.accountName;
        const accountBalance = this.props.accountBalance;
         const accountBudget = this.props.accountBudget;
        return(
            <div className="App-header">

                <h1>Budgie</h1>
                <h2>Welcome Back {accountName}!</h2>
                <article id="spending">
                    <p>Budget: {accountBudget}</p>
                    <p>Balance: {accountBalance}</p>
                    <p>Total spent this month:</p>
                </article>
                <article id="budgeting">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Amount Spent?" name="spendamt"/>
                        <input type="submit" value="Submit"/>
                    </form>
                </article>
                <Result state={this.state}/>
            </div>

        );
    }
    handleSubmit = async (evt) =>{
        evt.preventDefault();
        let spendamt = document.querySelector('input[name="spendamt"]').value;

        this.setState({
            accountBudget: this.state.accountBudget,
            accountUsername: this.state.accountUsername,
            accountBalance: this.state.accountBalance,
            spendamt: spendamt
        });
    }
}


export default App;
