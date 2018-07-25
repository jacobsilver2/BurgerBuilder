//dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
//components
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
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
      },
    }
   }

   checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
   }

   inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      } 
    };
    this.setState({controls: updatedControls});
   }

   submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value)
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

    const form = formElementsArray.map(el => {
      <Input 
        key={el.id}
        elementType={el.config.elementType} 
        elementConfig={el.config.elementConfig} 
        value={el.config.value} 
        invalid = {!el.config.valid}
        shouldValidate = {el.config.validation}
        touched={el.config.touched}
        changed={(event) => this.inputChangedHandler(event, el.id)}
      />
    })

    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  }
}

export default connect(null, mapDispatchToProps)(Auth);