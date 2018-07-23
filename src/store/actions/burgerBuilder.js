//dependencies
import axios from '../../axios-orders';
//constants
import * as actionTypes from './actionTypes';


export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  }
}

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  }
}

export const initIngredients = () => {
  return dispatch => {
    axios.get('https://react-my-burger-a8bce.firebaseio.com/ingredients.json')
    .then(response => {
      dispatch(setIngredients(response.data)) 
    }).catch(error => dispatch(fetchIngredientsFailed()))
  }
}

// internal functions called by initIngredients

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}