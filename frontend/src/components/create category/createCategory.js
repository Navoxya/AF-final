import React, { Component } from 'react';
import axios from 'axios';

const initialState = {
    name: '',
    description: ''
}

class CreateCategory extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }


    onSubmit(e) {
        e.preventDefault();
        let category = {
            name: this.state.name,
            description: this.state.description
        };
        console.log('DATA TO SEND', category)
        axios.post('http://localhost:4000/category/create', category)
            .then(response => {
                alert('Category Data successfully inserted')
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    render() {
        return (
            <div className="container">
                <h1>Create Category</h1>
                <div class="w-75 p-3 shadow-lg p-3 mb-5 bg-white rounded p-3 mb-2 bg-light text-dark " >
                    <form onSubmit={this.onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Category Name</label>
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
                            <label htmlFor="description" className="form-label">Category Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={this.state.description}
                                onChange={this.onChange}
                            />
                        </div>
                        <button type="submit" class="form-control btn btn-outline-primary btn-lg btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateCategory;