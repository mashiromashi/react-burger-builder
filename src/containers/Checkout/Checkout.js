import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "../Checkout/ContactData/ContactData";
import { connect } from "react-redux";

export class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };

  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredient = {};
  //   let price = 0;
  //   for (let param of query.entries()) {
  //     if (param[0] === "price") {
  //       price = param[1];
  //     } else {
  //       ingredient[param[0]] = +param[1];
  //     }
  //   }
  //   this.setState({ ingredients: ingredient, totalPrice: price });
  // }

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace("/check-out/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;

    if (this.props.ings) {
      const purchaseRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;

      summary = (
        <div>
          {purchaseRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancel={this.checkoutCanceledHandler}
            checkoutContinue={this.checkoutContinueHandler}
          />
          <Route
            path={this.props.match.url + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);

//nested route write format
/* <Route
          path={this.props.match.url + "/contact-data"}
          render={props => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              {...props}
            />
          )} */

/* /> */
