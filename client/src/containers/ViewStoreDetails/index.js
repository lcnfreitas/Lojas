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
            // busca todos os produtos desta loja
            const products_res = await axios.get(`/api/stores/products/${storeId}`);
            if (Object.entries(products_res.data).length > 0) {
                this.setState({ isStoreEmpty: false, store_products: products_res.data });
            }
            // busca as informacoes da loja especifica
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
            title: "Tem certeza?",
            text: "Você está prestes a remover o produto selecionado desta loja.",
            icon: "warning",
            buttons: ["Cancelar", "Sim, remover"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    // primeiro: realiza a remocao do produto no estoque da loja
                    axios.delete(`/api/inventory/${id}`, { headers: { 'Accept': 'application/json' } })
                        .then(response => {
                            // segundo: remove da lista do estado local
                            let updatedProducts = this.state.store_products.filter(prod => prod.id !== id)
                            this.setState({ store_products: updatedProducts })
                            // se a loja ficar sem produtos, atualiza isStoreEmpty para true
                            if (updatedProducts.length <= 0) {
                                console.log("A loja esta sem produtos agora!")
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
                        R$ {Number.parseFloat(inventory.local_price).toFixed(2)}
                    </div>
                    <div className="store_col">
                        {inventory.quantity}
                    </div>
                    <div className="store_col">
                        {inventory.comment}
                    </div>
                    <div id="action_btn_block">
                        <div id="add_btn_store">
                            <Link to={`/inventory/${inventory.id}/${inventory.store_id}`}>
                                <button className="btn btn-outline-primary action_btn">Atualizar</button>
                            </Link>
                        </div>
                        <button onClick={(e) => this.handleDelete(e, inventory.id)} type="submit" className="btn btn-outline-danger action_btn">Excluir</button>
                    </div>
                </div>
            ));

        let storeDetailsForm =
            <form>
                <div className="store_container">
                    <div className="store_row_header">
                        <h3>Nome do Produto</h3>
                        <h3>Preço Local</h3>
                        <h3>Quantidade Local</h3>
                        <h3>Comentários</h3>
                        <h3>Ações</h3>
                    </div>
                    {inventory}
                </div>
            </form>

        return (
            <div className="wrapper">
                <h2 className="header">Detalhes da Loja</h2>
                <h3>Nome da Loja: {this.state.store_name}</h3>
                <div id="add_btn_store">
                    <Link to={`/products/add/${this.state.store_name}/${this.state.store_id}`}>
                        <button className="btn btn-outline-primary action_btn_store">Adicionar Produto à Loja</button>
                    </Link>
                </div>
                {this.state.isStoreEmpty ? (
                    <div>
                        *** Esta loja não possui produtos associados. Adicione itens ao estoque <Link to={`/products/add/${this.state.store_name}/${this.state.store_id}`}>adicionar</Link> ou <Link to={`/stores`}>retorne</Link> para a página de lojas. ***
                    </div>
                ) : storeDetailsForm}
            </div>
        )
    }
}

export default ViewStoreDetails;