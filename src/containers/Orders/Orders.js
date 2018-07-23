//dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux'
//axios (only used to wrap withErrorHandler HOC)
import axios from '../../axios-orders';
//components
import Order from './Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
//actions
import * as actions from '../../store/actions/index';

class Orders extends Component {

  componentDidMount() {
    this.props.onFetchOrders()
  }

  render() {
    let orders = <Spinner />
    if (!this.props.loading) {
      orders = this.props.orders.map(order => <Order key={order.id} ingredients={order.ingredients} price={+order.price} />)
    }
    return (
      <div>
        {orders}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));