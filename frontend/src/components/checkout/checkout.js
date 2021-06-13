import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';

const initialState = {
    categories: [],
    foods: [],
    optionsc: [],
    optionf: [],
    quantity: '',
    selectedCategories: '',
    selectedFood: '',
    totPrice: 0
}

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCategorySelect = this.onCategorySelect.bind(this);
        this.onFoodSelect = this.onFoodSelect.bind(this);
        this.state = initialState;
    }

    componentDidMount() {
        axios.get('http://localhost:4000/category/')
            .then(response => {
                this.setState({ categories: response.data.data }, () => {
                    let data = [];
                    this.state.categories.map((item, index) => {
                        let category = {
                            value: item._id,
                            label: item.name
                        }
                        data.push(category)
                    });
                    this.setState({ optionsc: data });

                })
            })


    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onCategorySelect(e) {
        this.setState({ selectedCategories: e.value });
        const category = e.value
        axios.get(`http://localhost:4000/category/${category}`)
            .then(response => {
                this.setState({ foods: response.data.data }, () => {
                    let data = [];
                    this.state.foods.map((item, index) => {
                        let food = {
                            value: item._id,
                            label: item.name
                        }
                        data.push(food)
                    });
                    this.setState({ optionsf: data });

                })
            })
    }

    onFoodSelect(e) {
        this.setState({ selectedFood: e.value });
    }
    onSubmit(e) {
        e.preventDefault();
        let calculation = {
            fid: this.state.selectedFood,
            quantity: this.state.quantity
        };
        console.log('DATA TO SEND', calculation)
        axios.post('http://localhost:4000/food/calculate', calculation)
            .then(response => {
                console.log(response)
                this.setState({ totPrice: response.data.price });
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    render() {


        return (
            <div className="container">
                <h1>Calculate Bill </h1>
                <div class="w-75 p-3 shadow-lg p-3 mb-5 bg-white rounded p-3 mb-2 bg-light text-dark " >
                    <form onSubmit={this.onSubmit}>

                        <label htmlFor="name" className="form-label">Select Category</label>
                        <Select
                            options={this.state.optionsc}
                            onChange={this.onCategorySelect}
                            className="basic-multi-select"

                        />
                        <label htmlFor="name" className="form-label">Select Food</label>
                        <Select
                            options={this.state.optionsf}
                            onChange={this.onFoodSelect}
                            className="basic-multi-select"

                        />
                        <div className="mb-3">
                            <label htmlFor="code" className="form-label">Select Quantity</label>
                            <input
                                type="Number"
                                className="form-control"
                                id="quantity"
                                name="quantity"
                                value={this.state.quantity}
                                onChange={this.onChange}
                            />
                        </div>
                        <button type="submit" class="form-control btn btn-outline-danger btn-lg btn-block">Calculate</button>
                        <div className="m-5">
                            <h1>Total Price : {this.state.totPrice}.00</h1>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Checkout;