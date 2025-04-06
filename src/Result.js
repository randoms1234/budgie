import React from 'react';
let url = 'https://dev.connorrichardson.co.uk/api.php';
let firstOpen = 0;

class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stateid: 0,
            accountBudget: this.props.state.accountBudget, // Initialize state
            accountSpent: this.props.state.accountSpent,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.state.stateid === 1 && prevProps.state.newBudget !== this.props.state.newBudget) {
            // Only update the budget if the stateid is 1 and the newBudget has changed
            const budget = this.props.state.newBudget;
            this.setState({ accountBudget: budget }, () => {
                const updateBudget = {
                    action: "updateBudget",
                    username: this.props.state.accountUsername,
                    budget: budget
                };
                this.updateAccount(updateBudget);
            });
        }
    }

    render() {
        let balance = this.props.state.accountBalance;
        let budget = this.state.accountBudget; // Use the state variable for budget
        let spent = this.props.state.accountSpent;
        if (this.props.state.stateid !== 1) {
            if (firstOpen === 0) {
                firstOpen = 1;

            } else {
                if (this.props.state.addmoney === '1') {
                    balance = Number(this.props.state.accountBalance) + Number(this.props.state.spendamt);
                } else {
                    balance = Number(this.props.state.accountBalance) - Number(this.props.state.spendamt);
                }

                let username = this.props.state.accountUsername;
                const updateBalance = {
                    action: "updateBalance",
                    username: username,
                    balance: balance
                };

                this.updateAccount(updateBalance);
            }
        }
        const balanceStyle ={
            color: balance < budget ? 'red' : 'white'
        }

        return (
            <div>
                <p>Budget: £{budget}</p>
                <p className="balance" style={balanceStyle}>Balance: £{balance}</p>
                <p>Total Spent: £{spent}</p>
            </div>
        );
    }

    updateAccount = (update) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(update)
        })
            .then(response => {
                if (response.ok) {
                    return response.json(); // Parse the JSON response here
                } else {
                    throw new Error('Something went wrong'); // Handle HTTP errors
                }
            })
            .then(data => {
                console.log(data); // Log the resolved JSON response
            })
            .catch(error => {
                console.error('Error:', error.message); // Catch and log fetch-related errors
            });
    }
}

export default Result;