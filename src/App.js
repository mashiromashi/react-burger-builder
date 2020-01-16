import React, { Component } from "react";
//lazy loading
import asynComponent from "./hoc/asyncComponent/asyncComponent";
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

import { Route, Switch, Redirect } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/Actions/index";

//lazy loading
const asynCheckout = asynComponent(() => {
  return import("./containers/Checkout/Checkout");
});

const asynOrders = asynComponent(() => {
  return import("./containers/Orders/Orders");
});

const asynAuth = asynComponent(() => {
  return import("./containers/Auth/Auth");
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asynAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticate) {
      routes = (
        <Switch>
          <Route path="/check-out" component={asynCheckout} />
          <Route path="/logout" component={Logout} />
          <Route path="/orders" component={asynOrders} />
          <Route path="/auth" component={asynAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticate: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
