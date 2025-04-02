import React from 'react';
let url = 'https://dev.connorrichardson.co.uk/api.php';
let firstOpen = 0;
class Result extends React.Component {
    constructor(props) {
        super(props);
    }


    render = ()=> {
        let balance = this.props.state.accountBalance;
        if(firstOpen === 0){
            firstOpen = 1;

        }else{
            let username = this.props.state.accountUsername;
            let budg = this.props.state.accountBudget;
            let spend = this.props.state.spendamt;
            balance = Number(this.props.state.accountBudget) - Number(this.props.state.spendamt);
            const updateBalance={
                action: "updateBalance",
                username: username,
                balance: balance

            };

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateBalance)
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


        return(
            <p>Balance: {balance}</p>
        );
    }
}

export default Result;