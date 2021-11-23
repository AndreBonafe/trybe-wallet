import React from 'react';
import { func, objectOf, arrayOf } from 'prop-types';
import { connect } from 'react-redux';
import { actionAddExpense, fetchValues } from '../actions';

const optionsTag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const optionsValues = [
  'USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC', 'LTC',
  'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP',
];

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDispatch = this.handleDispatch.bind(this);
  }

  componentDidMount() {
    const { fetchCoins } = this.props;
    fetchCoins();
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
    const { saveExpenses, fetchCoins, expenses } = this.props;
    fetchCoins();
    const { exchangeRates } = this.props;
    const obj = this.setObjExpense(this.state, expenses, exchangeRates);
    this.setState({
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
      valueCurrency: 0,
    });
    return saveExpenses(obj);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { value, description } = this.state;
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
        Moeda:
        <select
          data-testid="currency-input"
          name="currency"
          onChange={ this.handleChange }
        >
          {optionsValues.map((coin) => (
            <option key={ coin }>{coin}</option>
          ))}
        </select>
        Método de Pagamento:
        <select data-testid="method-input" name="method" onChange={ this.handleChange }>
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        Tag:
        <select data-testid="tag-input" name="tag" onChange={ this.handleChange }>
          {optionsTag.map((tag) => (
            <option key={ tag }>{tag}</option>
          ))}
        </select>
        Descrição:
        <input
          type="text"
          data-testid="description-input"
          name="description"
          onChange={ this.handleChange }
          value={ description }
        />
        <button type="submit" onClick={ () => this.handleDispatch() }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  expenses: arrayOf().isRequired,
  exchangeRates: objectOf().isRequired,
  saveExpenses: func.isRequired,
  fetchCoins: func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  exchangeRates: state.wallet.values,
});

const mapDispatchtoProps = (dispatch) => ({
  saveExpenses: (obj) => dispatch(actionAddExpense(obj)),
  fetchCoins: () => dispatch(fetchValues()),
});

export default connect(mapStateToProps, mapDispatchtoProps)(Form);
