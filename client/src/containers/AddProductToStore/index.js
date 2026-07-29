import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import './style.css';

class AddStoreProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            store_name: '',
            store_id: '',
            product_id: '',
            price: '',
            stock_quantity: 100,
            comments: '',
            products: []
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.isValidFloat = this.isValidFloat.bind(this);
    }

    async componentDidMount() {
        const { store_name, store_id, storeName, storeId } = this.props.match.params;

        let finalStoreId = store_id || storeId || '';
        let rawStoreName = store_name || storeName || '';

        // Fallback por URL caso os parametros do React Router venham vazios
        if (!finalStoreId) {
            const pathParts = window.location.pathname.split('/').filter(Boolean);
            finalStoreId = pathParts[pathParts.length - 1];
            if (!rawStoreName && pathParts.length >= 2) {
                rawStoreName = pathParts[pathParts.length - 2];
            }
        }

        const decodedStoreName = rawStoreName ? decodeURIComponent(rawStoreName) : '';

        this.setState({
            store_id: finalStoreId,
            store_name: decodedStoreName
        });

        try {
            const productsRes = await axios.get('/api/products');
            if (productsRes.data && Array.isArray(productsRes.data)) {
                this.setState({ products: productsRes.data });
            }

            if (!decodedStoreName && finalStoreId) {
                const storeRes = await axios.get(`/api/stores/${finalStoreId}`);
                if (storeRes.data && storeRes.data.store_name) {
                    this.setState({ store_name: storeRes.data.store_name });
                }
            }
        } catch (e) {
            console.log("Erro ao carregar dados:", e);
        }
    }

    handleInputChange(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState(prevState => ({
            ...prevState, [name]: value
        }));
    }

    handleSelectChange(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState(prevState => ({
            ...prevState, [name]: value
        }));
    }

    isValidFloat(num) {
        let regex = /^\d*\.?\d*$/;
        return regex.test(num);
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { store_id, product_id, price, stock_quantity, comments } = this.state;

        if (!store_id) {
            swal("Ops!", "ID da loja não encontrado na requisição.", "error");
            return;
        } 
        if (!product_id) {
            swal("Ops!", "Selecione um produto.", "error");
            return;
        } 
        if (price === '') {
            swal("Ops!", "Preço local do produto é um campo obrigatório.", "error");
            return;
        } 
        if (!this.isValidFloat(price)) {
            swal("Ops!", "Insira um preço válido. Exemplo: 10.50", "error");
            return;
        } 
        if (stock_quantity === '') {
            swal("Ops!", "Quantidade inicial é um campo obrigatório.", "error");
            return;
        }

        try {
            // Envia os dados para a API de inventario
            const response = await axios.post('/api/inventory', {
                store_id: store_id,
                product_id: product_id,
                local_price: price,
                quantity: stock_quantity,
                comment: comments
            }, { headers: { 'Accept': 'application/json' } });

            // Trata retornos 200 (OK) e 201 (Created)
            if (response.status === 200 || response.status === 201) {
                await swal("Sucesso!", "Produto adicionado à loja com sucesso!", "success");
                window.location.href = `/stores/products/${store_id}`;
            } else {
                swal("Ops!", "O servidor respondeu com alerta. Verifique os dados.", "warning");
            }
        } catch (e) {
            console.log("Erro ao cadastrar inventario:", e);
            swal("Ops!", "Erro ao adicionar produto a esta loja.", "error");
        }
    }

    render() {
        return (
            <div className="wrapper">
                <form className="container-fluid" encType="multipart/form-data" onSubmit={this.handleSubmit}>
                    <h1 className="header">Adicionar Produto do Estoque Geral à Loja</h1>
                    <h3 className="sub_header" style={{ marginBottom: '20px' }}>
                        Nome da Loja: <strong>{this.state.store_name}</strong>
                    </h3>

                    <div className="add_row">
                        <label>Nome do Produto (*):</label>
                        <select
                            onChange={this.handleSelectChange}
                            name="product_id"
                            className="form-control"
                            value={this.state.product_id}>
                            <option value="">-- Selecione --</option>
                            {this.state.products.map(product => (
                                <option key={product.id} value={product.id}>
                                    {product.product_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="add_row">
                        <label>Preço Local do Produto (*):</label>
                        <input
                            type="text"
                            id="price"
                            className="form-control"
                            name="price"
                            onChange={this.handleInputChange}
                            value={this.state.price}
                            required
                        />
                    </div>

                    <div className="add_row">
                        <label>Quantidade Inicial nesta Loja (*):</label>
                        <input
                            type="number"
                            id="stock_quantity"
                            className="form-control"
                            name="stock_quantity"
                            onChange={this.handleInputChange}
                            value={this.state.stock_quantity}
                            required
                        />
                    </div>

                    <div className="add_row">
                        <label>Comentários sobre o Produto (opcional):</label>
                        <input
                            type="text"
                            id="comments"
                            className="form-control"
                            name="comments"
                            onChange={this.handleInputChange}
                            value={this.state.comments}
                        />
                    </div>

                    <div className="add_store_action_btn_block">
                        <button type="submit" className="btn btn-outline-primary action_btn">Salvar</button>
                        <Link to={`/stores/products/${this.state.store_id}`}>
                            <button type="button" className="btn btn-outline-danger action_btn">Cancelar</button>
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddStoreProduct;