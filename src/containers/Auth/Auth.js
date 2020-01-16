import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import * as action from "../../store/Actions/index";
import { connect } from "react-redux";
import "./Auth.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import { checkValidation } from "../../share/validation";

export class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "example@gmail.com"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valide: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valide: false,
        touched: false
      }
    },
    isSignup: true
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.onSetOfRedirectPath();
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valide: checkValidation(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };
    this.setState({ controls: updatedControls });
  };

  loginSubmitHandler = event => {
    event.preventDefault();

    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignup: !prevState.isSignup
      };
    });
  };

  render() {
    const fromElementArray = [];
    for (let key in this.state.controls) {
      fromElementArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = fromElementArray.map(formElement => (
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
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;
    if (this.props.isAuthenticate) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className="Auth">
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.loginSubmitHandler}>
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          Switch to {this.state.isSignup ? "Signin" : "Signup"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticate: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.alreadyBuilding,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSingup) =>
      dispatch(action.authentication(email, password, isSingup)),
    onSetOfRedirectPath: () => dispatch(action.setAuthRedirectPath("/"))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
