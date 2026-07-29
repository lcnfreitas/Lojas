import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';

import './style.css';
import './search_style.css';

class Inventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_input: '',
            inventory: this.props.inventory
        }
        // this.handleInputChange = this.handleInputChange.bind(this);

    }

    filterInventory() {
        if (this.state.search_input === '') {
            let filtered_inventory = this.props.inventory.map(inventory => (
                <div className="inventory_row" key={inventory.id}>
                    <div className="inventory_col">
                        {inventory.product_name}
                    </div>

                    <div className="inventory_col">
                        <Link to={`/stores/products/${inventory.store_id}`}>{inventory.store_name}</Link>
                    </div>

                    <div className="inventory_col">
                        {inventory.quantity}
                    </div>

                    <div className="inventory_col">
                        {inventory.comment}
                    </div>
                </div>
            )
            )
            return (filtered_inventory);
        } else {
            let filtered_inventory = this.props.inventory
                .filter(entry => entry.product_name.toLowerCase().includes(this.state.search_input) || entry.store_name.toLowerCase().includes(this.state.search_input))
                .map(inventory => (
                    <div className="inventory_row" key={inventory.id}>
                        <div className="inventory_col">
                            {inventory.product_name}
                        </div>

                        <div className="inventory_col">
                            <Link to={`/stores/products/${inventory.store_id}`}>{inventory.store_name}</Link>
                        </div>

                        <div className="inventory_col">
                            {inventory.quantity}
                        </div>

                        <div className="inventory_col">
                            {inventory.comment}
                        </div>
                    </div>
                )
                )
            return (filtered_inventory);
        }

    }

    handleInputChange(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState(prevState => ({
            ...prevState, [name]: value.toLowerCase()
        }))
    }

    render() {
        let filter_inventory = this.filterInventory()
        // this.filterInventory()
        return (
            <div className="wrapper">
                <h2 className="header">Global Inventory of Available Products:</h2>
                <div id="search">
                    <label htmlFor="search-input">Search:</label>
                    <input onChange={(e) => this.handleInputChange(e)} aria-label="Search" autoComplete="on" id="search-input" name="search_input" value={this.state.search_input} placeholder="Search" speech="true" type="search" />
                    <svg viewBox="0 0 24 24">
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                        <path d="M0 0h24v24H0z" fill="none" />
                    </svg>
                </div>
                {/* <div id="add_btn_stores"><Link to={`/inventory/add`}><button className="btn btn-outline-primary">Add New Inventory Entry</button></Link></div> */}
                <div className="inventory_container">
                    <div className="inventory_row_header" key={uuid()}>
                        <h3 className="inventory_col">Product Name</h3>
                        <h3 className="inventory_col">Store Name</h3>
                        <h3 className="inventory_col">Quantity</h3>
                        <h3 className="inventory_col">Comments</h3>
                    </div>
                    {/* {this.state.inventory} */}
                    {filter_inventory}
                </div>
            </div>
        )

    }
}

export default Inventory;