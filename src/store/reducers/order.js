import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  purchasing: false,
  purchased: false
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      //merging id and order object properties:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      }
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder),
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      //error is mostly handled via withOrderHandler HOC on Orderdata.js
      return {
        ...state,
        loading: false,
      };
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      }
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false
      }
    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false
      }
    default: return state;
  }
}

export default reducer;