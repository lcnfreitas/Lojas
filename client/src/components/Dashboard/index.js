import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./style.css";
import storeimg from './../../img/stores.png';
import prodimg from './../../img/products.png';
import inventoryimg from './../../img/inventory.png';

class Dashboard extends Component {
    render() {
        return (
            <div className="wrapper">
                <div className="jumbotron jumbotron-fluid jumbotron_local">
                    <div className="container">
                        <h1 className="display-4">Bem vindo ao App Lojas!</h1>
                        <p className="lead">Uma aplicação de gestão de estoque e produtos para suas lojas..</p>
                    </div>
                </div>
                <div className="options">
                    <Link to='/stores'>
                        <div className="card">
                            <p>Lojas</p>
                            <img className="icon" alt="stores icon" src={storeimg} />
                        </div>
                    </Link>
                    <Link to='/products'>
                        <div className="card">
                            <p>Produtos</p>
                            <img className="icon" alt="product icon" src={prodimg} />
                        </div>
                    </Link>
                    <Link to='/inventory'>
                        <div className="card">
                            <p>Estoque</p>
                            <img className="icon" alt="inventory icon" src={inventoryimg} />
                        </div>
                    </Link>
                </div>

            </div>
        )
    }
}
export default Dashboard;
