import React, { Component } from "react";
import Model from "../../components/UI/Modal/Modal";
import Aux from "../Aux";

const errorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
      this.reqInterceptors = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });

      this.resInterceptros = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      //console.log("will unmounted", this.resInterceptros, this.reqInterceptors);
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.response.eject(this.resInterceptros);
    }

    errorConfirmHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Model show={this.state.error} modelClosed={this.errorConfirmHandler}>
            {this.state.error && this.state.error.message}
          </Model>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default errorHandler;
