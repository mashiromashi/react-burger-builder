import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFailed = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then(res => {
        dispatch(purchaseBurgerSuccess(res.data, orderData));
      })
      .catch(err => {
        dispatch(purchaseBurgerFailed(err));
      });
  };
};

export const fetchOrderSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrderFailed = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error: error
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrder = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrderStart());
    const queryParam =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("/orders.json" + queryParam)
      .then(res => {
        const fetchOrders = [];
        for (let key in res.data) {
          fetchOrders.push({ ...res.data[key], id: key });
        }
        dispatch(fetchOrderSuccess(fetchOrders));
      })
      .catch(err => {
        dispatch(fetchOrderFailed(err));
      });
  };
};
