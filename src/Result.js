import React from 'react';
let url = 'https://dev.connorrichardson.co.uk/api.php';
class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountBudget: this.props.state.accountBudget,
            accountSpent: this.props.state.accountSpent,
            accountIncome: this.props.state.accountIncome,
            accountBalance: this.props.state.accountBalance,
            addmoney: "",
        };
    }

    componentDidUpdate(prevProps) {
        // Process updates when `addmoney` changes
        if (this.props.state.addmoney && prevProps.state.addmoney !== this.props.state.addmoney) {
            let balance = Number(this.state.accountBalance);
            let income = Number(this.state.accountIncome);
            let totalSpent = Number(this.state.accountSpent);

            if (this.props.state.addmoney === "1") {
                // Add money
                balance += Number(this.props.state.spendamt);
                income += Number(this.props.state.spendamt);
            } else if (this.props.state.addmoney === "2") {
                // Remove money (spend)
                balance -= Number(this.props.state.spendamt);
                totalSpent += Number(this.props.state.spendamt);
            }

            const update = {
                action: "updateBalance",
                username: this.props.state.accountUsername,
                balance: balance,
            };

            // Update via Fetch and update local state on success
            this.updateAccount(update, this.props.state.addmoney === "1", balance, income, totalSpent);

            // Reset `addmoney` to avoid repeated triggering
            this.setState({ addmoney: "" });
        }

        // Process updates when `newBudget` changes and `stateid` is 1
        if (this.props.state.stateid === 1 && prevProps.state.newBudget !== this.props.state.newBudget) {
            // Only update the budget if the stateid is 1 and the newBudget has changed
            let balance = Number(this.state.accountBalance);
            let income = Number(this.state.accountIncome);
            let totalSpent = Number(this.state.accountSpent);
            const budget = this.props.state.newBudget;
            this.setState({ accountBudget: budget }, () => {
                const updateBudget = {
                    action: "updateBudget",
                    username: this.props.state.accountUsername,
                    budget: budget,
                };
                this.updateAccount(updateBudget, balance, income, totalSpent);
            });
        }
    }

    render() {
        const { accountBudget, accountBalance, accountIncome, accountSpent } = this.state;
        let budgDiff = this.state.accountBudget - accountBalance;

        const balanceStyle = {
            color: accountBalance < accountBudget ? "red" : "black",
        };

        return (
            <div className="result">
                <h3>Your Stats</h3>
                <p>
                    Budget Goal: <strong>£{accountBudget}</strong>
                </p>
                <p>Amount needed to reach Budget Goal:</p>
                <p><strong>£{budgDiff}</strong></p>
                <p className="balance" style={balanceStyle}>
                    Current Balance: <strong>£{accountBalance}</strong>
                </p>
                <p>
                    Total Income Added: <strong>£{accountIncome}</strong>
                </p>
                <p>
                    Total Spent: <strong>£{accountSpent}</strong>
                </p>
            </div>
        );
    }

    updateAccount = (update, isAdding, balance, income, totalSpent) => {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(update),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json(); // Parse JSON response
                } else {
                    throw new Error("Failed to update account");
                }
            })
            .then((data) => {
                if(this.props.state.stateid === 1){
                    console.log(data);
                }else{
                    // Update the state with the new values returned from the server
                    this.setState({
                        accountBalance: balance,
                        accountIncome: isAdding ? income : this.state.accountIncome,
                        accountSpent: !isAdding ? totalSpent : this.state.accountSpent,
                    });
                }

            })
            .catch((error) => {
                console.error("Error:", error.message);
            });
    };
}

export default Result;