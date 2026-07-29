import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import './style.css';

class AddProductToStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            store_name: '',
            store_id: '',
            product_name: '',
            product_price: '',
            product_qty: 100,
            product_img_url: '',
            product_comment: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.isValidFloat = this.isValidFloat.bind(this);
    }

    componentDidMount() {
        const { store_name } = this.props.match.params;
        const { store_id } = this.props.match.params;
        this.setState({ store_name: store_name, store_id: store_id })
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

    isValidFloat(num) {
        let regex = /^\d*\.?\d*$/;
        if (regex.test(num)) {
            return true;
        }
        return false;
    }

    handleSubmit = async event => {
        event.preventDefault();

        let product_name = this.state.product_name;
        let product_price = this.state.product_price;
        let product_qty = this.state.product_qty;
        let product_img_url = this.state.product_img_url;
        let product_comment = this.state.product_comment;

        let product_insert_response = '';

        if (product_name === '' || product_name.includes(",")) {
            swal("Oops!", "Product Name is a required field and it should not include commas.", "error");
        } else if (product_price === '') {
            swal("Oops!", "Product Price is a required field.", "error");
        } else if (this.isValidFloat(product_price) === false) {
            swal("Oops!", "Enter a Valid Product Price. Example: 0.00", "error");
        } else if (product_qty === '') {
            swal("Oops!", "Product Qty is a required field.", "error");
        } else if (product_img_url === '') {
            swal("Oops!", "Product Image URL is a required field.", "error");
        }

        if (product_name !== '' && product_price !== '' && this.isValidFloat(product_price) === true && product_qty !== '') {
            try {
                 // add the new product to the products table
                product_insert_response = await axios.post(`/api/products`, { product_name: product_name, product_price: product_price, product_image_url: product_img_url, product_comment: product_comment }, { headers: { 'Accept': 'application/json' } });
                if (product_insert_response.status === 200) {
                    swal("Success!", "A new product has been added!", "info")
                    .then((value) => {
                        window.location.href = "/products"
                    })
                }
            } catch (e) {
                console.log(e);
                swal("Oops!", "Something went wrong adding this product.", "error"); // adding product to inventory depends on a successful product creation first
            }
        }
    }

    render() {
        return (
            <div className="wrapper">
                <form className="container-fluid" encType="multipart/form-data">
                    <h2 className="header">Add New Product to Global Inventory</h2>
      
                    <div className="add_row">
                        <label>Product Name  (*): </label>
                        <input
                            name={"product_name"}
                            type="text"
                            id="product_name"
                            className="form-control"

                            onChange={(e) => this.handleInputChange(e)}
                            value={this.state.product_name}
                            required
                        />
                    </div>
                    <div className="add_row">
                        <label>Suggested Retail Price  (*):</label>
                        <input
                            type="text"
                            id="product_price"
                            className="form-control"
                            name={"product_price"}
                            onChange={(e) => this.handleInputChange(e)}
                            value={this.state.product_price}
                            required
                        />
                    </div>
                    <div className="add_row">
                        <label>Product Image URL (optional):</label>
                        <input
                            type="text"
                            id="product_img_url"
                            className="form-control"
                            name="product_img_url"
                            onChange={(e) => this.handleInputChange(e)}
                            value={this.state.product_img_url}
                        />
                    </div>
                    <div className="add_row">
                        <label>Product Comments (optional):</label>
                        <input
                            type="text"
                            id="product_comment"
                            className="form-control"
                            name="product_comment"
                            onChange={(e) => this.handleInputChange(e)}
                            value={this.state.product_comment}
                        />
                    </div>
                    <div className="add_store_action_btn_block">
                        <button onClick={this.handleSubmit} className="btn btn-outline-primary action_btn">Submit</button>
                        <Link to={`/products`}><button className="btn btn-outline-danger action_btn">Cancel</button></Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddProductToStore;



