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
            stateid: 0,
            accountSpent: this.props.accountSpent,
            accountIncome: this.props.accountIncome,
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
                </article>
                <article id="budgeting">
                    <p>Add income or add spending</p>
                    <br></br>
                    <form onSubmit={this.handleSubmit}>
                        <label>Add income <input type="radio" name="addmoney" value="1"/></label>

                        <label>Add Spending <input type="radio" name="addmoney" value="2"/></label>

                        <input type="text" placeholder="Enter amount" name="spendamt"/>
                        <input type="submit" value="Submit"/>
                    </form>
                    <button onClick={this.budgetButton} id="budgBut">Change Budget Goal</button>
                    <form onSubmit={this.handleBudgetChange} id="budgetChange">
                        <input type="text" placeholder="Enter new Budget Goal" name="budget"/>
                        <input type="submit" value="Submit"/>
                    </form>
                </article>

            </div>

        );
    }

    budgetButton = () =>{
        document.querySelector('#budgetChange').style.display = 'block';
        document.querySelector('#budgBut').style.display = 'none';
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
            stateid: 0,
            accountSpent: this.state.accountSpent,
            accountIncome: this.state.accountIncome,
        });
    }
}


export default App;
//TODO:{
// fix css on App.js
// Look at what else needs to be added
// }