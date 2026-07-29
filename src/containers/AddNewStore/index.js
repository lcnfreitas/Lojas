import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import './style.css';

class AddNewStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            store_name: '',
            store_city: '',
            store_state: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleInputChange(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState(prevState => ({
            ...prevState, [name]: value

        }), () => console.log(this.state))
    }

    handleSelectChange(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState(prevState => ({
            ...prevState, [name]: value

        }), () => console.log(this.state))
    }

    handleSubmit = async event => {
        event.preventDefault();

        let storeName = this.state.store_name;
        let storeCity = this.state.store_city;
        let storeState = this.state.store_state;

        if (storeName === '') {
            swal("Oops!", "Store Name is a required field.", "error");
        } else if (storeCity === '') {
            swal("Oops!", "Store City is a required field.", "error");
        } else if (storeState === '') {
            swal("Oops!", "Store State is a required field.", "error");
        }

        if (storeName !== '' && storeCity !== '' && storeState !== '') {
            // handle the submission of the form data to the database
            axios.post('/api/stores', { store_name: storeName, store_city: storeCity, store_state: storeState }, { headers: { 'Accept': 'application/json' } })
                .then(response => {
                    console.log(response)
                    if (response.status === 200) {
                        swal("Success!", "A new store has been added!", "info")
                            .then((value) => {
                                window.location.href = "/stores"
                            })
                    }
                    if (response.data.status === false || response.data.status === '500') {
                        swal("Oops!", "Something went wrong adding this store.", "error");
                    }
                });
        }
    }

    render() {
        return (
            <div className="wrapper">
                <form className="container-fluid" encType="multipart/form-data">
                    <h1 className="header">Add a Store</h1>
                    <div className="add_row">
                        <label>Store Name: </label>
                        <input
                            type="text"
                            id="store_name"
                            className="form-control"
                            name={"store_name"}
                            onChange={(e) => this.handleInputChange(e)}
                            value={this.state.store_name}
                            required
                        />
                    </div>
                    <div className="add_row">
                        <label>Store City:</label>
                        <input
                            type="text"
                            id="store_city"
                            className="form-control"
                            name={"store_city"}
                            onChange={(e) => this.handleInputChange(e)}
                            value={this.state.store_city}
                            required
                        />
                    </div>
                    <div className="add_row">
                        <label>Store State:</label>
                        <select
                            onChange={(e) => this.handleSelectChange(e)}
                            name="store_state"
                            className="form-control"
                            id={this.state.store_state}>
                            <option value="">-- Select --</option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
                    </div>
                    <div className="add_store_action_btn_block">
                        <button onClick={this.handleSubmit} className="btn btn-outline-primary action_btn">Submit</button>
                        <Link to={`/stores`}><button className="btn btn-outline-danger action_btn">Cancel</button></Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddNewStore;



