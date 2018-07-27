//constants
import * as actionTypes from '../actions/actionTypes';
//utility
import { updateObject } from '../../shared/utility';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: true,
};

const addIngredient = (state, action) => {
  const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true // if user authenticates during the burger building process, their burger info is stored
  }
  return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
  const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
  const updatedIngs = updateObject(state.ingredients, updatedIng)
  const updatedSt = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true // if user authenticates during the burger building process, their burger info is stored

  }
  return updateObject(state, updatedSt);
}

const setIngredients = (state, action) => {
      // ingredients must be added manually in order to insure proper ordering of ingredients
      return updateObject(state, {
        ingredients: {
        salad: action.ingredients.salad,
        bacon: action.ingredients.bacon,
        cheese: action.ingredients.cheese,
        meat: action.ingredients.meat,
      },
      totalPrice: 4,
      error: false,
      building: false // since the page was just reloaded, we're not building yet
    });
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action); 
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return updateObject(state, {error: true});
    default: return state;
    }
}

export default reducer;