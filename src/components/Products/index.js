import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Products extends Component {
    render() {
        let products =
            this.props.products.map(product => (
                <div key={product.id} className="prod_row">
                    <div className="prod_col">
                        <img src={product.product_image_url} crossOrigin="true" alt={product.product_name} className="product_img prod_col" />
                    </div>
                    <div className="prod_col">{product.product_name}</div>
                    <div className="prod_col">
                        ${Number.parseFloat(product.product_price).toFixed(2)}
                    </div>
                    <div className="prod_col">{product.product_comment}</div>
                    <div className="prod_col" id="action_btn_block_prod">
                        <div id="update_product"><button onClick={() => this.props.handleDeleteProduct(product.id)} className="btn btn-outline-danger">Delete From All Stores</button></div>
                    </div>
                </div>
            ));

        return (
            <div className="wrapper">
                <h2 className="header">Global Inventory of Products:</h2>
                <div id="add_btn_stores"><Link to={`/products/add`}><button className="btn btn-outline-primary">Add New Product</button></Link></div>
                <div className="prod_row_header">
                    <h3>Image</h3>
                    <h3>Name</h3>
                    <h3>Unit Cost</h3>
                    <h3>Comment</h3>
                    <h3>Action</h3>
                </div>
                {products}
            </div>
        )
    }
}

export default Products;


