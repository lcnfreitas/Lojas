import React from 'react';
import './style.css';

const Nav = props => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Fiesta!</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse local_nav" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-item nav-link active" href="/">Home <span className="sr-only">(current)</span></a>
                    <a className="nav-item nav-link" href="/products">Products</a>
                    <a className="nav-item nav-link" href="/stores">Stores</a>
                    <a className="nav-item nav-link" href="/inventory">Inventory</a>
                </div>
            </div>
        </nav>
    )
};

export default Nav;