import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = { 
    username: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
   }

   orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Jacob Silver',
                address: {
                    street: 'TestStreet 1',
                    zipCode: '6543456',
                    country: 'USA'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false})
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false})
            });
   }

  render() {
    let form  = (
      <form>
      <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
      <input className={classes.Input} type="email" name="email" placeholder="Your Email"/>
      <input className={classes.Input} type="text" name="street" placeholder="Your Street"/>
      <input className={classes.Input} type="text" name="postal" placeholder="Your Postal Code"/>
      <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
    </form >
    );

    if (this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>   
    );
  }
}

export default ContactData;