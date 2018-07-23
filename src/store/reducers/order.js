//constants
import * as actionTypes from '../actions/actionTypes';
//utility
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  purchasing: false,
  purchased: false
}

const purchaseBurgerSuccess = (state, action) => {
        //merging id and order object properties:
        const newOrder = updateObject(action.orderData, {id: action.orderId})
        return updateObject(state, {
          loading: false,
          purchased: true,
          orders: state.orders.concat(newOrder)
        })
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START: return updateObject(state, {loading:true})
    case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action)
    case actionTypes.PURCHASE_BURGER_FAIL: return updateObject(state, {loading: false})
   //error is mostly handled via withOrderHandler HOC on Orderdata.js
    case actionTypes.PURCHASE_INIT: return updateObject(state, {purchased: false})        
    case actionTypes.FETCH_ORDERS_START: return updateObject(state, {loading: true})
    case actionTypes.FETCH_ORDERS_SUCCESS: return updateObject(state, {orders: action.orders, loading: false})
    case actionTypes.FETCH_ORDERS_FAIL: return updateObject(state, {loading: false})
    default: return state;
  }
}

export default reducer;