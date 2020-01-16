import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../../components/UI/Button/Button";
import "./ContactData.css";
import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import errorHandler from "../../../hoc/ErrorHandler/ErrorHandler";
import * as orderActions from "../../../store/Actions/index";
import { checkValidation } from "../../../share/validation";

export class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valide: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valide: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZipCode"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
          isNumeric: true
        },
        valide: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        valide: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-mail"
        },
        value: "",
        validation: {
          required: true
        },
        valide: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest",
        validation: {},
        valide: true
      }
    },
    formIsValid: false
  };

  orderhandler = event => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    };
    //call order
    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };

    let updateFormElement = { ...updatedOrderForm[inputIdentifier] };

    updateFormElement.value = event.target.value;
    updateFormElement.valide = checkValidation(
      updateFormElement.value,
      updateFormElement.validation
    );
    updateFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updateFormElement;

    let formIsValid = true;
    for (let inputIdentifiers in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifiers].valide && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const fromElementArray = [];
    for (let key in this.state.orderForm) {
      fromElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderhandler}>
        {fromElementArray.map(formElement => (
          <Input
            key={formElement.id}
            elementtype={formElement.config.elementType}
            elementconfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valide}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}

        <Button btnType="Success" disabled={!this.state.formIsValid}>
          Order
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className="ContactData">
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(orderActions.purchaseBurger(orderData, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(errorHandler(ContactData, axios));
