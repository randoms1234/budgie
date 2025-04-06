import React from 'react';
let url = 'https://dev.connorrichardson.co.uk/api.php';
let firstOpen = 0;
class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stateid: 0,
        }
    }


    render = ()=> {
        let balance = this.props.state.accountBalance;
        let budget = this.props.state.accountBudget;
        if (this.props.state.stateid === 1){
            budget = this.props.state.newBudget;
            const updateBudget={
                action: "updateBudget",
                username: this.props.state.accountUsername,
                budget: budget
            }
                this.updateAccount(updateBudget);

        }else{
            if(firstOpen === 0){
                firstOpen = 1;

            }else{
                if (this.props.state.addmoney === '1'){
                    balance = Number(this.props.state.accountBalance) + Number(this.props.state.spendamt);
                }else{
                    balance = Number(this.props.state.accountBalance) - Number(this.props.state.spendamt);
                }

                let username = this.props.state.accountUsername;
                const updateBalance={
                    action: "updateBalance",
                    username: username,
                    balance: balance
                };
                this.updateAccount(updateBalance);

            }
        }



        return(
            <div>
                <p>Budget: {budget}</p>
                <p>Balance: {balance}</p>
            </div>
        );
    }

    updateAccount = (update) =>{
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