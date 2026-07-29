import React from 'react';
import './style.css';

const Nav = props => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Lojas!</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse local_nav" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-item nav-link active" href="/">Inicio <span className="sr-only">(current)</span></a>
                    <a className="nav-item nav-link" href="/products">Produtos</a>
                    <a className="nav-item nav-link" href="/stores">Lojas</a>
                    <a className="nav-item nav-link" href="/inventory">Estoque</a>
                </div>
            </div>
        </nav>
    )
};

export default Nav;