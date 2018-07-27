// ALL ACTIONS GET EXPORTED FROM ONE FILE, ./index.js

//axios config file
import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    id: id,
    orderData: orderData
  }
}

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  }
}



export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

//async actions
export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart())
    axios.post('/orders.json?auth=' + token, orderData)
    .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        
    })
    .catch(error => {
        dispatch(purchaseBurgerFail(error))
    });
  }
}

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    //making a query param to fetch data from the server which matches the userId.  Make sure to wrap userId in double quotation marks! Also don't forget to wrap the userId variable in double quotes
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';  
    axios.get('/orders.json' + queryParams)
    .then(res => {
      const fetchedOrders = [];
      for (let key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key
        });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders))
    })
    .catch(err => {
      dispatch(fetchOrdersFail(err))
    })
  }
}
