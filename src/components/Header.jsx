import React from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  attTotal() {
    const { expenses } = this.props;
    const values = expenses.map((exps) => parseFloat(exps.value) * parseFloat(exps.exchangeRates.[exps.currency].ask));
    if(values.length > 0) return values.reduce((a, b) => a + b);
    return 0;
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <span data-testid="email-field">
          { `Email: ${email}` }
        </span>
        <span data-testid="total-field">
          {`Despesa Total: ${this.attTotal().toFixed([2])}`}
        </span>
        <span data-testid="header-currency-field">
          BRL
        </span>
      </div>
    );
  }
}

Header.propTypes = {
  email: string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
