import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Stores extends Component {
    render() {
        console.log( this.props.stores)
        let stores = this.props.stores.map(store => (
            <div key={store.id} className="stores_row">
                <div className="stores_col">{store.store_name}</div>
                <div className="stores_col">{store.store_city}, {store.store_state}</div>
                <div className="stores_col" id="action_btn_block_stores">
                    <Link to={`/stores/products/${store.id}`}><button className="btn btn-outline-primary action_btn_stores">View Store</button></Link>
                    <button onClick={() => this.props.handleDeleteStore(store.id)} className="btn btn-outline-danger action_btn_stores">Delete Store</button>
                </div>
            </div>
        ));

        return (
            <div className="wrapper">
                <h2 className="header">List of Stores</h2>                
                <div id="add_btn_stores"><Link to={`/stores/add`}><button className="btn btn-outline-primary">Add New Store</button></Link></div>
                <div className="stores_row_header">
                    <h3>Name</h3>
                    <h3>Location</h3>
                    <h3>Actions</h3>
                </div>
                {stores}
            </div>
        )
    }
}

export default Stores;