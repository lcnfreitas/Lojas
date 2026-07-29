import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import './style.css';

class AddNewStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            store_name: '',
            store_city: '',
            store_state: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
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

    handleSubmit = async event => {
        event.preventDefault();

        let storeName = this.state.store_name;
        let storeCity = this.state.store_city;
        let storeState = this.state.store_state;

        if (storeName === '') {
            swal("Ops!", "Nome da Loja é um campo obrigatório.", "error");
        } else if (storeCity === '') {
            swal("Ops!", "Cidade é um campo obrigatório.", "error");
        } else if (storeState === '') {
            swal("Ops!", "Estado é um campo obrigatório.", "error");
        }

        if (storeName !== '' && storeCity !== '' && storeState !== '') {
            // envia os dados da nova loja para o banco de dados
            axios.post('/api/stores', { store_name: storeName, store_city: storeCity, store_state: storeState }, { headers: { 'Accept': 'application/json' } })
                .then(response => {
                    console.log(response)
                    if (response.status === 200) {
                        swal("Sucesso!", "Nova loja adicionada com sucesso!", "info")
                            .then((value) => {
                                window.location.href = "/stores"
                            })
                    }
                    if (response.data.status === false || response.data.status === '500') {
                        swal("Ops!", "Ocorreu um erro ao adicionar esta loja.", "error");
                    }
                });
        }
    }

    render() {
        return (
            <div className="wrapper">
                <form className="container-fluid" encType="multipart/form-data">
                    <h1 className="header">Adicionar Nova Loja</h1>
                    <div className="add_row">
                        <label>Nome da Loja: </label>
                        <input
                            type="text"
                            id="store_name"
                            className="form-control"
                            name={"store_name"}
                            onChange={(e) => this.handleInputChange(e)}
                            value={this.state.store_name}
                            required
                        />
                    </div>
                    <div className="add_row">
                        <label>Cidade:</label>
                        <input
                            type="text"
                            id="store_city"
                            className="form-control"
                            name={"store_city"}
                            onChange={(e) => this.handleInputChange(e)}
                            value={this.state.store_city}
                            required
                        />
                    </div>
                    <div className="add_row">
                        <label>Estado:</label>
                        <select
                            onChange={(e) => this.handleSelectChange(e)}
                            name="store_state"
                            className="form-control"
                            id={this.state.store_state}>
                            <option value="">-- Selecione --</option>
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                        </select>
                    </div>
                    <div className="add_store_action_btn_block">
                        <button onClick={this.handleSubmit} className="btn btn-outline-primary action_btn">Salvar</button>
                        <Link to={`/stores`}><button className="btn btn-outline-danger action_btn">Cancelar</button></Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddNewStore;