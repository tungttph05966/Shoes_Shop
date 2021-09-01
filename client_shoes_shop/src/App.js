import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import Routers from './routers';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import * as actions from './actions';

class App extends Component {
  componentDidMount() {
    this.props.getProductCategories();
    this.props.getCarts();
    this.props.getUserInfo();
  }
  
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <Routers />
          <Footer />
        </Router>
        <ToastContainer />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.common.loading,
  }
}

const mapDispatchToProps = dispatch => ({
  getProductCategories: (params) => dispatch(actions.getProductCategories(params)),
  getCarts: (params) => dispatch(actions.getCarts(params)),
  getUserInfo: (params) => dispatch(actions.getUserInfo(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App)