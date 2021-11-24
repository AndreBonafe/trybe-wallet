// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const GET_VALUES = 'GET_VALUES';
export const REQUEST_VALUES = 'REQUEST_VALUES';

export const actionLogin = ({ email }) => ({
  type: LOGIN,
  email,
});

export const actionAddExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

const actionGetValues = (json) => ({
  type: GET_VALUES, payload: json,
});

export const fetchValues = () => (
  (dispatch) => (
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((r) => r.json()
        .then((json) => dispatch(actionGetValues(json))))
  )
);
