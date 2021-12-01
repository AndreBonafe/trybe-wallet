import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  actionAddExpense,
  actionChangeEditing,
  actionReplaceValue,
  fetchValues } from '../actions';

const optionsTag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const optionsPayment = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      description: '',
      currency: 'CAD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDispatch = this.handleDispatch.bind(this);
  }

  async componentDidMount() {
    const { fetchCoins } = this.props;
    await fetchCoins();
  }

  setObjExpense({ value, description, currency, method, tag }, expenses, exchangeRates) {
    const { editingValue, isEditing } = this.props;
    return {
      id: isEditing ? editingValue.id : expenses.length,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates: isEditing ? editingValue.exchangeRates : exchangeRates,
    };
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleDispatch() {
    const {
      saveExpenses,
      fetchCoins,
      expenses,
      replaceExpense,
      isEditing,
      changeEditing,
    } = this.props;
    await fetchCoins();
    const { exchangeRates } = this.props;
    const obj = this.setObjExpense(this.state, expenses, exchangeRates);
    this.setState({
      value: 0,
      description: '',
      currency: 'CAD',
      method: 'Dinheiro',
      tag: '',
    });
    if (isEditing) {
      replaceExpense(obj);
      changeEditing(false);
      console.log(obj);
    } else saveExpenses(obj);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { value, description } = this.state;
    const { exchangeRates, isEditing } = this.props;
    return (
      <form onSubmit={ this.handleSubmit }>
        Valor:
        <input
          type="text"
          data-testid="value-input"
          name="value"
          onChange={ this.handleChange }
          value={ value }
        />
        <label htmlFor="currency">
          Moeda
          <select
            data-testid="currency-input"
            name="currency"
            onChange={ this.handleChange }
            id="currency"
          >
            {exchangeRates && Object.keys(exchangeRates).filter((curr) => curr !== 'USDT')
              .map((coin) => (<option key={ coin }>{coin}</option>))}
          </select>
        </label>
        Método de Pagamento:
        <select data-testid="method-input" name="method" onChange={ this.handleChange }>
          {optionsPayment.map((curr) => (<option key={ curr }>{curr}</option>))}
        </select>
        Tag:
        <select data-testid="tag-input" name="tag" onChange={ this.handleChange }>
          {optionsTag.map((tag) => (<option key={ tag }>{tag}</option>))}
        </select>
        Descrição:
        <input
          type="text"
          data-testid="description-input"
          name="description"
          onChange={ this.handleChange }
          value={ description }
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
  isEditing: PropTypes.any,
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
});

export default connect(mapStateToProps, mapDispatchtoProps)(Form);
