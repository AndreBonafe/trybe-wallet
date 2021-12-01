import {
  ADD_EXPENSE,
  CHANGE_EDITING,
  DELETE_ITEM,
  GET_EDIT_VALUE,
  GET_VALUES,
  REPLACE_VALUE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  values: {},
  editingValue: {},
  isEditing: false,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case GET_VALUES:
    return {
      ...state,
      values: action.payload,
    };
  case DELETE_ITEM:
    return {
      ...state,
      expenses: state.expenses.filter((curr) => curr.id !== action.id),
    };
  case GET_EDIT_VALUE:
    return {
      ...state,
      editingValue: state.expenses.find((curr) => curr.id === Number(action.id)),
    };
  case REPLACE_VALUE:
    return {
      ...state,
      expenses: state.expenses.map((item) => (
        item.id === action.newValue.id ? action.newValue : item)),
    };
  case CHANGE_EDITING:
    return {
      ...state,
      isEditing: action.isEditing,
    };
  default:
    return state;
  }
}

export default wallet;
