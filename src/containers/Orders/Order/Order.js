import React from 'react';
import classes from './Order.css';

const order = (props) => {
  const myIngredients = [];

  for (let ingredientName in props.ingredients) {
    myIngredients.push({name: ingredientName, amount: props.ingredients[ingredientName]});
  }

  const ingredientOutput = myIngredients.map(ingredient => (
    <span 
        style={{textTransform: 'capitalize', display: 'inline-block', margin: '0 8px', border: '1px solid #ccc', padding: '5px'}} 
        key={ingredient.name}>{ingredient.name}: {ingredient.amount}
      </span>
  ));
  
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>USD: ${props.price.toFixed(2)}</strong></p>
    </div>
    );
};

export default order;