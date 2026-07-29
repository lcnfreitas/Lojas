import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import './style.css';

class ViewStoreDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            store_name: '',
            store_products: [],
            store_id: '',
            quantity: '',
            local_price: '',
            comments: '',
            isStoreEmpty: true
        }
        this.getProducts = this.getProducts.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    async componentDidMount() {
        this.getProducts();
    }

    getProducts = async () => {
        const { storeId } = this.props.match.params;
        try {
            // get all the products of this store
            const products_res = await axios.get(`/api/stores/products/${storeId}`);
            if (Object.entries(products_res.data).length > 0) {
                this.setState({ isStoreEmpty: false, store_products: products_res.data });
            }
            // get the store info for a particular store
            const res_data = await axios.get(`/api/stores/${storeId}`);
            if (Object.entries(res_data.data).length > 0) {
                this.setState({ store_id: storeId, store_name: res_data.data.store_name });
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleDelete = (event, id) => {
        event.preventDefault();
        swal({
            title: "Are you sure?",
            text: "You are about to remove the selected product from this store.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    // first: handle the deletion of this product in the inventory
                    axios.delete(`/api/inventory/${id}`, { headers: { 'Accept': 'application/json' } })
                        .then(response => {
                            // second: remove it from store products state
                            let updatedProducts = this.state.store_products.filter(prod => prod.id !== id)
                            this.setState({ store_products: updatedProducts })
                            // if no products are left in store, then set isStoreEmpty back to true
                            if (updatedProducts.length <= 0) {
                                console.log("store is empty now!")
                                this.setState({ isStoreEmpty: true });
                            }
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
            });
    }

    render() {
        let inventory =
            this.state.store_products.map(inventory => (
                <div className="store_row" key={inventory.id}>
                    <div className="store_col">
                        {inventory.product_name}
                    </div>
                    <div className="store_col">
                        ${Number.parseFloat(inventory.local_price).toFixed(2)}
                    </div>
                    <div className="store_col">
                        {inventory.quantity}
                    </div>
                    <div className="store_col">
                        {inventory.comment}
                    </div>
                    <div id="action_btn_block">
                        <div id="add_btn_store"><Link to={`/inventory/${inventory.id}/${inventory.store_id}`}><button className="btn btn-outline-primary action_btn">Update</button></Link></div>
                        <button onClick={(e) => this.handleDelete(e, inventory.id)} type="submit" className="btn btn-outline-danger action_btn">Delete</button>
                    </div>
                </div>
            ));

        let storeDetailsForm =
            <form>
                <div className="store_container">
                    <div className="store_row_header">
                        <h3>Product Name</h3>
                        <h3>Local Price</h3>
                        <h3>Local Quantity</h3>
                        <h3>Comments</h3>
                        <h3>Actions</h3>
                    </div>
                    {inventory}
                </div>
            </form>

        return (
            <div className="wrapper">
                <h2 className="header">Store Details Page</h2>
                <h3>Store Name: {this.state.store_name}</h3>
                <div id="add_btn_store"><Link to={`/products/add/${this.state.store_name}/${this.state.store_id}`}><button className="btn btn-outline-primary action_btn_store">Add New Store Product</button></Link></div>
                {this.state.isStoreEmpty ? <div>*** This store does not have any products associated. Please <Link to={`/products/add/${this.state.store_name}/${this.state.store_id}`}>add</Link> some merchandise or <Link to={`/stores`}>return</Link> to the stores page. *** </div> : storeDetailsForm}
            </div>
        )
    }
}

export default ViewStoreDetails;