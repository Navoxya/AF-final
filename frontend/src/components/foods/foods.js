import React, { Component } from 'react';
import axios from 'axios';

class Foods extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foods: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/food/')
            .then(response => {
                this.setState({ foods: response.data.data });
            })
    }



    render() {
        return (
            <div className="container">
                <h1>Foods</h1>
                {this.state.foods.length > 0 && this.state.foods.map((item, index) => (
                    <div class=" shadow-lg  bg-white rounded  bg-light text-dark " >
                        <div key={index} className="card mb-3">
                            <div className="p-3">
                                <h4>Food Code: {item.code}</h4>
                                <h5>Name: {item.name}</h5>
                                <h5>Amount: {item.amount}</h5>
                                <h5>Size: {item.size}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default Foods;