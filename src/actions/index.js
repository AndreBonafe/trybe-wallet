// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const GET_VALUES = 'GET_VALUES';
export const REQUEST_VALUES = 'REQUEST_VALUES';
export const DELETE_ITEM = 'DELETE_ITEM';
export const GET_EDIT_VALUE = 'GET_EDIT_VALUE';
export const REPLACE_VALUE = 'REPLACE_VALUE';
export const CHANGE_EDITING = 'CHANGE_EDITING';
export const CHANGE_EDIT = 'CHANGE_EDIT';

export const actionLogin = ({ email }) => ({
  type: LOGIN,
  email,
});

export const actionAddExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const actionDeleteItem = (id) => ({
  type: DELETE_ITEM,
  id,
});

export const actionGetEditingValue = (id) => ({
  type: GET_EDIT_VALUE,
  id,
});

export const actionReplaceValue = (newValue) => ({
  type: REPLACE_VALUE,
  newValue,
});

export const actionChangeEditing = (bool) => ({
  type: CHANGE_EDITING,
  isEditing: bool,
});

export const actionEditValue = (newValue) => ({
  type: CHANGE_EDIT,
  newValue,
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
