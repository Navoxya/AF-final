import React, { Component } from 'react';
import axios from 'axios';

class Food extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foods: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:4000/category/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ foods: response.data.data })
            })
            .catch(error => {
                alert(error.message)
            })
    }

    render() {
        return (
            <div className="container">
                <h1>Category Foods</h1>
                {this.state.foods.length > 0 && this.state.foods.map((item, index) => (
                    <div class=" shadow-lg  bg-white rounded  bg-light text-dark " >
                        <div key={index} className="card mb-3">
                            <div className="p-3">
                                <h4>Food code: {item.code}</h4>
                                <h5>Food name: {item.name}</h5>
                                <h5>Food amount: {item.amount}</h5>
                                <h5>Food size: {item.size}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default Food;