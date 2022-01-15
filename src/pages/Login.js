import React from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { actionLogin } from '../actions';
import '../styles/Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkButton = this.checkButton.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  checkButton() {
    const { email, password } = this.state;
    const MIN_PSWD_LNTH = 5;
    if (email.includes('@') && password.length > MIN_PSWD_LNTH && email.includes('.')
      && email.includes('com')) {
      return false;
    }
    return true;
  }

  render() {
    const { login } = this.props;
    return (
      <div className="login-wrapper">
        <h1>Trybe Wallet</h1>
        <form onSubmit={ this.handleSubmit } className="login-form">
          <label htmlFor="email-input">
            <span>Email:</span>
            <input
              data-testid="email-input"
              type="email"
              name="email"
              id="email-input"
              onChange={ this.handleChange }
              required
            />
          </label>
          <label htmlFor="password-input">
            <span>Senha:</span>
            <input
              data-testid="password-input"
              type="password"
              name="password"
              id="password-input"
              minLength={ 6 }
              onChange={ this.handleChange }
              required
            />
          </label>
          <Link to="/carteira">
            <button
              type="submit"
              onClick={ () => login(this.state) }
              disabled={ this.checkButton() }
            >
              Entrar
              <AiOutlineArrowRight className="arrow" />
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  login: func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (obj) => dispatch(actionLogin(obj)),
});

export default connect(null, mapDispatchToProps)(Login);
