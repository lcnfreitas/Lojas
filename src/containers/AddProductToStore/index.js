import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import './style.css';

class AddNewStoreProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            all_products: [],
            current_inventory: [],
            store_name: '',
            store_id: '',
            product_id: '',
            product_name: '',
            product_price: '',
            product_qty: 100,
            product_comment: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.isValidFloat = this.isValidFloat.bind(this);
    }

    componentDidMount() {
        const { storeName } = this.props.match.params;
        const { storeId } = this.props.match.params;
        this.setState({ store_name: storeName, store_id: storeId })

        axios.get('/api/products')
            .then(response => {
                this.setState({ all_products: response.data });
            })
            .catch(e => {
                console.log(e);
            });

        axios.get('/api/inventory')
            .then(response => {
                this.setState({ current_inventory: response.data });
            })
            .catch(e => {
                console.log(e);
            });
    }

    handleInputChange(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState(prevState => ({
            ...prevState, [name]: value

        }), () => console.log(this.state))
    }

    handleSelectChange(e) {
        let name = e.target.name; // defines the name of the Select input
        let values = e.target.value.split(',')
        let value = values[0]; // defines the value of the option selected
        let product_name = values[1] // defines the text of the option selected
        this.setState(prevState => ({
            ...prevState, [name]: value, product_name: product_name

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
        let store_id = this.state.store_id;
        let product_id = this.state.product_id;
        let product_name = this.state.product_name;
        let store_name = this.state.store_name;
        let product_price = this.state.product_price;
        let product_qty = this.state.product_qty;
        let product_comment = this.state.product_comment;
        let inventory_insert_response = '';

        console.log(
            store_id,
            product_id,
            product_name,
            store_name,
            product_price,
            product_qty,
            product_comment)

        if (product_id === '') {
            swal("Oops!", "Product Name is a required field.", "error");
        } else if (product_price === '') {
            swal("Oops!", "Product Price is a required field.", "error");
        } else if (this.isValidFloat(product_price) === false) {
            swal("Oops!", "Enter a Valid Product Price. Example: 0.00", "error");
        } else if (product_qty === '') {
            swal("Oops!", "Product Qty is a required field.", "error");
        }
        //  else if (product_img_url === '') {
        //     swal("Oops!", "Product Image URL is a required field.", "error");
        // }

        if (product_id !== '' && product_price !== '' && this.isValidFloat(product_price) === true && product_qty !== '') {
            try {
                // add the new product to the inventory table and associate it to the store
                inventory_insert_response = await axios.post(`/api/inventory`, {
                    product_id: product_id,
                    product_name: product_name,
                    store_id: store_id,
                    store_name: store_name,
                    quantity: product_qty,
                    local_price: product_price,
                    comment: product_comment
                }, { headers: { 'Accept': 'application/json' } });

                if (inventory_insert_response.status === 200) {
                    swal("Success!", `A new product has been added to store ${store_name}!`, "info")
                        .then((value) => {
                            window.location.href = `/stores/products/${store_id}`
                        })
                }
            } catch (e) {
                console.log(e);
                swal("Oops!", "Something went wrong adding this product to inventory.", "error");
            }
        }
    }

    get_prods_not_in_store() {
        // this function makes a list of product ids that are not part of the current store in question
        let inventory = this.state.current_inventory
            .filter(line => parseInt(line.store_id) === parseInt(this.state.store_id)) // return list of all prods belonging to this store_id
            .map(entry => entry.product_id); // return list of list with all revelant prod ids

        let products = this.state.all_products.map(entry => entry.id);

        let list_of_products_not_in_store = [];

        // for every product id, look for that (product id [associated to] store id) and if associacion exist, don't add to final list
        for (let prod in products) {
            if (!inventory.includes(products[prod])) {
                list_of_products_not_in_store.push(products[prod]);
            }
        }
        return list_of_products_not_in_store;
    }
    render() {

        // make a list of all the product_ids not associated to this store
        let list_of_products_not_in_store = this.get_prods_not_in_store();

        // make a dropdown Menu with all of the products available products from the Products DB (BUT NOT YET ASSOCIATED TO THIS STORE)
        let select_products =
            this.state.all_products
                .filter(product => (list_of_products_not_in_store.includes(product.id)))
                .map(prod => <option key={prod.id} value={[prod.id,prod.product_name]}>{prod.product_name}</option>);
        return (
            <div className="wrapper">
                <form className="container-fluid" encType="multipart/form-data">
                    <h2 className="header">Add New Product to Store from Global Inventory</h2>
                    <h3>Store Name: {this.state.store_name}</h3>
                    <div className="add_row">
                        <label>Product Name (*): </label>
                        <select
                            onChange={(e) => this.handleSelectChange(e)}
                            name="product_id"
                            className="form-control"
                            // id="product_id"
                            required
                        >
                            <option value="">-- Select --</option>
                            {select_products}
                        </select>
                    </div>
                    <div className="add_row">
                        <label>Local Product Price (*):</label>
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
                        <label>Initial product qty at this store (*):</label>
                        <input
                            type="text"
                            id="product_qty"
                            className="form-control"
                            name={"product_qty"}
                            onChange={(e) => this.handleInputChange(e)}
                            value={this.state.product_qty}
                            required
                        />
                    </div>
                    <div className="add_row">
                        <label>Product comments (optional):</label>
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
                        <Link to={`/stores/products/${this.state.store_id}`}><button className="btn btn-outline-danger action_btn">Cancel</button></Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddNewStoreProduct;



