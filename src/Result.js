import React from 'react';
let url = 'https://dev.connorrichardson.co.uk/api.php';
let firstOpen = 0;
class Result extends React.Component {
    constructor(props) {
        super(props);
    }


    render = ()=> {
        let balance = this.props.state.accountBalance;
        if (this.props.state.stateid === 1){
            const newBalance = this.props.state.newBudget;
            console.log(newBalance);
        }else{
            if(firstOpen === 0){
                firstOpen = 1;

            }else{
                console.log(this.props.state.addmoney);
                if (this.props.state.addmoney === '1'){
                    console.log("income");
                    balance = Number(this.props.state.accountBalance) + Number(this.props.state.spendamt);
                }else{
                    console.log("spending");
                    balance = Number(this.props.state.accountBalance) - Number(this.props.state.spendamt);
                }

                let username = this.props.state.accountUsername;
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
        }



        return(
            <p>Balance: {balance}</p>
        );
    }
}

export default Result;