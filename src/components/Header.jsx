import React from 'react';
import { string, arrayOf } from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    console.log(email);
    return (
      <div>
        <p data-testid="email-field">
          { `Email: ${email}` }
        </p>
        <p data-testid="total-field">
          {`Dispesa Total: ${0 + expenses}`}
        </p>
        <span data-testid="header-currency-field">
          BRL
        </span>
      </div>
    );
  }
}

Header.propTypes = {
  email: string.isRequired,
  expenses: arrayOf().isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
