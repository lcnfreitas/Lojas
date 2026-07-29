import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import swal from 'sweetalert';

// import containers
import AddNewStore from './containers/AddNewStore';
import AddNewProduct from './containers/AddNewProduct';
import AddProductToStore from './containers/AddProductToStore';
import UpdateInventoryProduct from './containers/UpdateInventoryProduct';
import ViewStoreDetails from './containers/ViewStoreDetails';
import AddNewInventory from './containers/AddNewInventory';

// import Components
import Nav from './components/Nav';
import Dashboard from './components/Dashboard';
import Stores from './components/Stores';
import Products from './components/Products';
import Inventory from './components/Inventory';
import Footer from './components/Footer';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.state = {
      stores: [],
      products: [],
      inventory: []
    };
    this.handleDeleteStore = this.handleDeleteStore.bind(this);
  }
  componentDidMount() {
    axios.get('/api/stores')
      .then(response => {
        this.setState({ stores: response.data });
        console.log(this.state);
      })
      .catch(e => {
        console.log(e);
      });

    axios.get('/api/products')
      .then(response => {
        this.setState({ products: response.data });
        console.log(this.state);
      })
      .catch(e => {
        console.log(e);
      });

    axios.get('/api/inventory')
      .then(response => {
        this.setState({ inventory: response.data });
        console.log(this.state);
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleDeleteStore = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this store's records!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          // handle the deletion of a store entry in the DB
          axios.delete(`/api/stores/${id}`, { headers: { 'Accept': 'application/json' } })
            .then(response => {
              // fetch the new list of stores
              axios.get('/api/stores')
                .then(response => {
                  this.setState({ stores: response.data });
                  swal("Success! The store record has been deleted!", {
                    icon: "success",
                  });
                })
                .catch(e => {
                  console.log(e);
                });
            })
            .catch(e => {
              console.log(e);
            });
        }
      });
  }

  handleDeleteProduct = (id) => {
    console.log(id)
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product's records! but you can always re-create it by adding a new product.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          // handle the deletion of a product across all stores
          axios.delete(`http://localhost:3001/api/products/${id}`, { headers: { 'Accept': 'application/json' } })
            .then(response => {
              // fetch the new list of products
              axios.get('/api/products')
                .then(response => {
                  this.setState({ products: response.data });
                  swal("Success! The product record has been deleted!", {
                    icon: "success",
                  });
                })
                .catch(e => {
                  console.log(e);
                });
            })
            .catch(e => {
              console.log(e);
            });
        }
      });
  }

  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/stores' render={() => <Stores stores={this.state.stores} handleDeleteStore={this.handleDeleteStore} />} />
          <Route exact path='/stores/add' component={AddNewStore} />
          <Route exact path='/stores/products/:storeId' component={ViewStoreDetails} />
          <Route exact path='/products' render={() => <Products products={this.state.products} handleDeleteProduct={this.handleDeleteProduct} />} />
          <Route exact path='/products/add' component={AddNewProduct} />
          <Route exact path='/products/add/:storeName/:storeId' component={AddProductToStore} />
          <Route exact path='/inventory' render={() => <Inventory inventory={this.state.inventory} />} />
          <Route exact path='/inventory/add' component={AddNewInventory} />
          <Route exact path='/inventory/:inventoryId/:storeId' component={UpdateInventoryProduct} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;
