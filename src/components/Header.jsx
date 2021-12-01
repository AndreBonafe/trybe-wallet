import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  findAsk(expenses) {
    const currencyCerto = Object.values(expenses.exchangeRates)
      .find((curr) => expenses.currency === curr.code);
    return currencyCerto.ask;
  }

  attTotal() {
    const { expenses } = this.props;
    const values = expenses.map(
      (exps) => parseFloat(exps.value) * parseFloat(this.findAsk(exps)),
    );
    return expenses.length > 0 ? values.reduce((a, b) => a + b) : 0;
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <span data-testid="email-field">
          { `Email: ${email}` }
        </span>
        <span data-testid="total-field">
          {`Despesa Total: ${(this.attTotal()).toFixed([2])}`}
        </span>
        <span data-testid="header-currency-field">
          BRL
        </span>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.shape({
    length: PropTypes.number,
    map: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
