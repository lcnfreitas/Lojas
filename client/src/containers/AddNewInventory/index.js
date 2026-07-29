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

        if (product_name === '') {
            swal("Ops!", "Nome do Produto é um campo obrigatório.", "error");
        } else if (product_price === '') {
            swal("Ops!", "Preço do Produto é um campo obrigatório.", "error");
        } else if (this.isValidFloat(product_price) === false) {
            swal("Ops!", "Insira um preço válido. Exemplo: 0.00", "error");
        } else if (product_qty === '') {
            swal("Ops!", "Quantidade é um campo obrigatório.", "error");
        }

        if (product_name !== '' && product_price !== '' && this.isValidFloat(product_price) === true && product_qty !== '') {
            try {
                 // Adiciona o novo item ao estoque
                product_insert_response = await axios.post(`/api/products`, { product_name: product_name, product_price: product_price, product_image_url: product_img_url, product_comment: product_comment }, { headers: { 'Accept': 'application/json' } });
                if (product_insert_response.status === 200) {
                    swal("Sucesso!", "Novo item adicionado ao estoque!", "info")
                    .then((value) => {
                        window.location.href = "/products"
                    })
                }
            } catch (e) {
                console.log(e);
                swal("Ops!", "Ocorreu um erro ao adicionar este item ao estoque.", "error");
            }
        }
    }

    render() {
        return (
            <div className="wrapper">
                <form className="container-fluid" encType="multipart/form-data">
                    <h2 className="header">Adicionar Nova Entrada no Estoque</h2>
      
                    <div className="add_row">
                        <label>Nome do Produto (*): </label>
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
                        <label>Nome da Loja (*): </label>
                        <input
                            name={"store_name"}
                            type="text"
                            id="store_name"
                            className="form-control"

                            onChange={(e) => this.handleInputChange(e)}
                            value={this.state.store_name}
                            required
                        />
                    </div>
       
                    <div className="add_row">
                        <label>Quantidade de Unidades Disponíveis:</label>
                        <input
                            type="text"
                            id="product_qty"
                            className="form-control"
                            name="product_qty"
                            onChange={(e) => this.handleInputChange(e)}
                            value={this.state.product_qty}
                        />
                    </div>

                    <div className="add_row">
                        <label>Comentários (opcional):</label>
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
                        <button onClick={this.handleSubmit} className="btn btn-outline-primary action_btn">Salvar</button>
                        <Link to={`/stores/products/${this.state.store_id}`}><button className="btn btn-outline-danger action_btn">Cancelar</button></Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddProductToStore;