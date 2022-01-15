import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  actionAddExpense,
  actionChangeEditing,
  actionReplaceValue,
  fetchValues,
  actionEditValue } from '../actions';
import Selects from './Selects';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      canAtt: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDispatch = this.handleDispatch.bind(this);
  }

  async componentDidMount() {
    const { fetchCoins } = this.props;
    await fetchCoins();
  }

  setObjExpense({ value, description, currency, method, tag }, expenses, exchangeRates) {
    return {
      id: expenses.length,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    };
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  handleDispatch() {
    const {
      saveExpenses,
      fetchCoins,
      expenses,
      replaceExpense,
      isEditing,
      changeEditing,
      exchangeRates,
      editingValue,
    } = this.props;
    fetchCoins();
    const obj = this.setObjExpense(this.state, expenses, exchangeRates);
    if (isEditing) {
      replaceExpense(editingValue);
      changeEditing(false);
    } else saveExpenses(obj);
    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { exchangeRates, isEditing, editingValue, EditValue } = this.props;
    return (
      <form onSubmit={ this.handleSubmit } className={ isEditing ? 'edit' : 'new-value' }>
        Valor:
        <input
          type="text"
          data-testid="value-input"
          name="value"
          onChange={ isEditing ? ({ target }) => EditValue({
            ...editingValue,
            value: target.value }) : this.handleChange }
          value={ isEditing ? editingValue.value : value }
        />
        {exchangeRates && <Selects
          isEditing={ isEditing }
          EditValue={ EditValue }
          handleChange={ this.handleChange }
          editingValue={ editingValue }
          exchangeRates={ exchangeRates }
          values={ { currency, method, tag } }
        />}
        Descrição:
        <input
          type="text"
          data-testid="description-input"
          name="description"
          onChange={ isEditing ? ({ target }) => EditValue({
            ...editingValue,
            description: target.value }) : this.handleChange }
          value={ isEditing ? editingValue.description : description }
        />
        <button
          type="submit"
          onClick={ () => this.handleDispatch() }
        >
          {isEditing ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  editingValue: PropTypes.shape({
    id: PropTypes.number,
  }),
  exchangeRates: PropTypes.func,
  expenses: PropTypes.shape([
    PropTypes.string,
  ]),
  fetchCoins: PropTypes.func,
  isEditing: PropTypes.bool,
  replaceExpense: PropTypes.func,
  saveExpenses: PropTypes.func,
  changeEditing: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  exchangeRates: state.wallet.values,
  editingValue: state.wallet.editingValue,
  isEditing: state.wallet.isEditing,
});

const mapDispatchtoProps = (dispatch) => ({
  saveExpenses: (obj) => dispatch(actionAddExpense(obj)),
  fetchCoins: () => dispatch(fetchValues()),
  replaceExpense: (newValue) => dispatch(actionReplaceValue(newValue)),
  changeEditing: (bool) => dispatch(actionChangeEditing(bool)),
  EditValue: (newValue) => dispatch(actionEditValue(newValue)),
});

export default connect(mapStateToProps, mapDispatchtoProps)(Form);
