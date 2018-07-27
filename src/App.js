//dependencies
import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//components
import Layout from './hoc/Layout/layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import * as actions from './store/actions/index';


//lazy loading the checkout, orders, and auth components
const asyncCheckout = asyncComponent( () => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent( () => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent( () => {
  return import('./containers/Auth/Auth');
});


class App extends Component {
  
  componentDidMount() {
    this.props.onTryAutoSignUp()
  }



  render() {
  //all general routes which don't require the user to be logged in
  let routes = (
    <Switch>
      <Route path="/auth" component={asyncAuth}/>
      <Route path="/" exact component={BurgerBuilder}/>
      {/* if none of these routes are found, ie if user tries to go to a route he/she doesn't have access to, they are redirected to the root page */}
      <Redirect to="/"/>
    </Switch>
  );

  // all the routes available to authenticated users
  if (this.props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" component={asyncCheckout}/>
        <Route path="/orders" component={asyncOrders}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/auth" component={asyncAuth}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/"/>
      </Switch>
    )
  }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

//using withRouter allows react router to work with connect
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
