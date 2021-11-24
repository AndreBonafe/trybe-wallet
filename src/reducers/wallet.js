import { ADD_EXPENSE, DELETE_ITEM, GET_VALUES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  values: {},
  expensesValues: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
      expensesValues: [...state.expensesValues, action.value],
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
  default:
    return state;
  }
}

export default wallet;
