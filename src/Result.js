import React from 'react';

class Result extends React.Component {
    constructor(props) {
        super(props);
    }


    render = ()=> {
        const budget = 1000;
        let balance = 2000;
        const income = Number(this.props.state.income);
        const spend= this.props.state.spendamt;
        const spendtype = this.props.state.spendtype;
        balance = balance + income;

        return(
            <p>{balance}</p>
        );
    }
}

export default Result;