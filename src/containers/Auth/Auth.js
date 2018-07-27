//dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
//components
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner'
//utility
import { updateObject, checkValidity } from '../../shared/utility';
//css
import classes from './Auth.css';
//actions
import * as actions from '../../store/actions/index';



class Auth extends Component {
  state = { 
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'EMAIL ADDRESS'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'PASSWORD'
        },
        value: '',
        validation: {
          required: true,
          minLength: 7
        },
        valid: false,
        touched: false,
        signUp: true,
      },
    }
   }

   componentDidMount() {
    //  is the user trying to redirect to checkout, and not building a burger?
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }  
   }
   inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      })
    });
    this.setState({controls: updatedControls});
   }

   submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.signUp)
   }

  swithAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        signUp: !prevState.signUp 
      }
    })
  }

  render() {
    //copied from ContactData.js
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      })
    };

    let form = formElementsArray.map(formElement => (
      <Input 
        key={formElement.id}
        elementType={formElement.config.elementType} 
        elementConfig={formElement.config.elementConfig} 
        value={formElement.config.value} 
        invalid = {!formElement.config.valid}
        shouldValidate = {formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    if (this.props.loading) {
      form = <Spinner />
    }

    let errorMessage = null;
    //firebase has a error.message property
    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      )
    }

    
    let authRedirect = null;
    //Once user logs in, redirect to BurgerBuilder, otherwise, authRedirect is null and displays nothing.
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath}/>
    }

    return (
      <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
          <Button 
            btnType="Danger"
            clicked={this.swithAuthModeHandler}>
            SWITCH TO {this.state.signUp ? 'SIGN IN' : 'SIGN UP'}</Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null, //true or false depending on if user is logged in or not
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')) //don't need to pass input in, because we'll always want to set this to the root path
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);