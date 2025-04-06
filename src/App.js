import React from 'react';
import './App.css';
import Result from "./Result.js"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountBudget: this.props.accountBudget,
            accountUsername: this.props.accountUsername,
            accountBalance: this.props.accountBalance,
            spendamt: '',
            addmoney: '',
            newBudget: '',
            stateid: 0
        };
    }

    render =() =>{
         const accountName = this.props.accountName;
        return(
            <div className="App-header">

                <h1>Budgie</h1>
                <h2>Welcome Back {accountName}!</h2>
                <article id="spending">
                    <Result state={this.state}/>
                    <p>Total spent this month:</p>
                </article>
                <article id="budgeting">
                    <p>Add income or add spending</p>
                    <br></br>
                    <form onSubmit={this.handleSubmit}>
                        <label>Add income</label>
                        <input type="radio" name="addmoney" value="1"/>
                        <label>Add Spending</label>
                        <input type="radio" name="addmoney" value="2"/>
                        <input type="text" placeholder="Enter amount" name="spendamt"/>
                        <input type="submit" value="Submit"/>
                    </form>
                    <button onClick={this.budgetButton}>Change Budget</button>
                    <form onSubmit={this.handleBudgetChange} id="budgetChange">
                        <input type="text" placeholder="Enter new budget" name="budget"/>
                        <input type="submit" value="Submit"/>
                    </form>
                </article>

            </div>

        );
    }

    budgetButton = () =>{
        document.querySelector('#budgetChange').style.display = 'block';
    }
    handleBudgetChange = async (evt) =>{
        evt.preventDefault();
        let newBudget = document.querySelector('input[name="budget"]').value;
        this.setState({
            newBudget: newBudget,
            accountUsername: this.state.accountUsername,
            stateid:1
        });
        document.querySelector('#budgetChange').style.display = 'none';
    }
    handleSubmit = async (evt) =>{
        evt.preventDefault();
        let spendamt = document.querySelector('input[name="spendamt"]').value;
        let addmoney = document.querySelector('input[name="addmoney"]:checked').value;

        this.setState({
            accountBudget: this.state.accountBudget,
            accountUsername: this.state.accountUsername,
            accountBalance: this.state.accountBalance,
            spendamt: spendamt,
            addmoney: addmoney,
            stateid: 0
        });
    }
}


export default App;
//TODO: add chanage budget functionality react and server side