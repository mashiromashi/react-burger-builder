import * as actionTypes from "../Actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const fetchOrderStart = (state, action) => {
  return {
    ...state,
    loading: true
  };
};
const fetchOrderSuccess = (state, action) => {
  return {
    ...state,
    orders: action.orders,
    loading: false
  };
};
const fetchOrderFailed = (state, action) => {
  return {
    ...state,
    loading: false
  };
};
const purchaseInit = (state, action) => {
  return {
    ...state,
    purchased: false
  };
};
const purchaseBurgerStart = (state, action) => {
  return {
    ...state,
    loading: true
  };
};
const purchaseBurgerSuccess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId
  };
  return {
    ...state,
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  };
};
const purchaseBurgerFailed = (state, action) => {
  return {
    ...state,
    loading: false
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrderStart(state, action);

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrderSuccess(state, action);

    case actionTypes.FETCH_ORDERS_FAILED:
      return fetchOrderFailed(state, action);

    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);

    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);

    case actionTypes.PURCHASE_BURGER_FAILED:
      return purchaseBurgerFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
