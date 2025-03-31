import React from 'react';
import './App.css';
import Result from "./Result.js"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            income: this.income,
            spendtype: this.spendtype,
            spendamt: this.spendamt,
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
                        <input type="text" placeholder="Income" name="income"/>
                        <input type="text" placeholder="Spending" name="spendamt"/>
                        <input type="radio" value="bills" name="spend"/>
                        <input type="radio" value="entertainment" name="spend"/>
                        <input type="radio" value="other" name="spend"/>
                        <input type="submit" value="Submit"/>
                    </form>
                </article>
                <Result state={this.state}/>
            </div>

        );
    }
    handleSubmit = async (evt) =>{
        evt.preventDefault();
        let spendamt =document.querySelector('input[name="spendamt"]').value;
        let income = document.querySelector('input[name="income"]').value;
        let spend = document.querySelector('input[name="spend"]:checked').value;
        this.setState({
            income: income,
            spendtype: spend,
            sendamt: spendamt
        });
    }
}


export default App;
