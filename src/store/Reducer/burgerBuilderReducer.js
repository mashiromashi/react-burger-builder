import * as actionTypes from "../Actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  ingredients: null,
  totalPrice: 5,
  error: false,
  alreadyBuilding: false
};

const Ingredient_Prices = {
  salad: 1,
  bacon: 5,
  cheese: 2,
  meat: 4
};

const addIngredients = (state, action) => {
  //destruction using utility
  const updatedIngredient = {
    [action.ingredientsName]: state.ingredients[action.ingredientsName] + 1
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    alreadyBuilding: true,
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + Ingredient_Prices[action.ingredientsName]
  };
  return updateObject(state, updatedState);
};

const removeIngredients = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.ingredientsName]: state.ingredients[action.ingredientsName] - 1
    },
    alreadyBuilding: true,
    totalPrice: state.totalPrice - Ingredient_Prices[action.ingredientsName]
  };
};

const setIngredients = (state, action) => {
  return {
    ...state,
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      meat: action.ingredients.meat,
      cheese: action.ingredients.cheese
    },
    totalPrice: 5,
    error: false,
    alreadyBuilding: false
  };
};

const fetchIngredientFailed = (state, action) => {
  return {
    ...state,
    error: true
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INDEGRIENTS:
      return addIngredients(state, action);

    case actionTypes.REMOVE_INDEGRIENTS:
      return removeIngredients(state, action);

    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientFailed(state, action);

    default:
      return state;
  }
};

export default reducer;
