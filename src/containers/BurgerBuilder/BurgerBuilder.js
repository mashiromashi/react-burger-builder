import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import errorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import * as burgerBuilderAction from "../../store/Actions/index";
import axios from "../../axios-order";

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatedPurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticate) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectpath("/check-out");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push({
      pathname: "/check-out"
    });
    // const queryParam = [];
    // for (let i in this.state.ingredients) {
    //   queryParam.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.state.ingredients[i])
    //   );
    // }
    // queryParam.push("price=" + this.state.totalPrice);
    // const queryString = queryParam.join("&");
    // this.props.history.push({
    //   pathname: "/check-out",
    //   search: "?" + queryString
    // });
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.props.error ? (
      <p>Ingredient can't be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientsAdded={this.props.onIngredientsAdded}
            ingredientsRemoved={this.props.onIngredientsRemoved}
            disabled={disabledInfo}
            purchaseable={this.updatedPurchaseState(this.props.ings)}
            price={this.props.price}
            isAuth={this.props.isAuthenticate}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modelClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticate: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientsAdded: ingName =>
      dispatch(burgerBuilderAction.addIngredients(ingName)),
    onIngredientsRemoved: ingName =>
      dispatch(burgerBuilderAction.removeIngredients(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderAction.initialIngredients()),
    onInitPurchase: () => dispatch(burgerBuilderAction.purchaseInit()),
    onSetAuthRedirectpath: path =>
      dispatch(burgerBuilderAction.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(errorHandler(BurgerBuilder, axios));
