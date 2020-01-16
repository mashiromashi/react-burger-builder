import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

export const addIngredients = name => {
  return {
    type: actionTypes.ADD_INDEGRIENTS,
    ingredientsName: name
  };
};

export const removeIngredients = name => {
  return {
    type: actionTypes.REMOVE_INDEGRIENTS,
    ingredientsName: name
  };
};

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initialIngredients = () => {
  return dispatch => {
    axios
      .get(`https://react-my-burger-13557.firebaseio.com/ingredients.json`)
      .then(res => {
        dispatch(setIngredients(res.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
