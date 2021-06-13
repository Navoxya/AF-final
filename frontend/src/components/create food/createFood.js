import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';

const initialState = {
    code: '',
    name: '',
    amount: '',
    size: '',
    categories: [],
    options: [],
    selectedCategories: []
}

class CreateFood extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCategorySelect = this.onCategorySelect.bind(this);
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
                    this.setState({ options: data });
                })
            })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onCategorySelect(e) {
        this.setState({ selectedCategories: e ? e.map(item => item.value) : [] });
    }

    onSubmit(e) {
        e.preventDefault();
        let food = {
            code: this.state.code,
            name: this.state.name,
            amount: this.state.amount,
            size: this.state.size,
            categories: this.state.selectedCategories
        };
        console.log('DATA TO SEND', food)
        axios.post('http://localhost:4000/food/create', food)
            .then(response => {
                alert('Food Data successfully inserted')
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    render() {
        return (
            <div className="container">
                <h1>Create Food</h1>
                <div class="w-75 p-3 shadow-lg p-3 mb-5 bg-white rounded p-3 mb-2 bg-light text-dark " >
                    <form onSubmit={this.onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="code" className="form-label">Food Code</label>
                            <input
                                type="text"
                                className="form-control"
                                id="code"
                                name="code"
                                value={this.state.code}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Food Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="amount" className="form-label">Food Amount</label>
                            <input
                                type="Number"
                                className="form-control"
                                id="amount"
                                name="amount"
                                value={this.state.amount}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="size" className="form-label">Food size</label>
                            <input
                                type="Number"
                                className="form-control"
                                id="size"
                                name="size"
                                value={this.state.size}
                                onChange={this.onChange}
                            />
                        </div>
                        <label htmlFor="category" className="form-label">Food Category</label>
                        <Select
                            options={this.state.options}
                            onChange={this.onCategorySelect}
                            className="basic-multi-select"
                            isMulti
                        />
                        <br></br>
                        <button type="submit" class="form-control btn btn-outline-success btn-lg btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateFood;