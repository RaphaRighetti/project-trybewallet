import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginAct } from '../redux/actions';

class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  isDisabled = () => {
    const { email, password } = this.state;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const minPasswordLength = 6;
    return !(emailRegex.test(email)) || password.length < minPasswordLength;
  };

  handleLogin = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(loginAct(email));
    history.push('/project-trybewallet/carteira');
  };

  render() {
    const { email, password } = this.state;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const minPasswordLength = 6;
    return (
      <>
        <div className="input-focus">
          <input
            name="email"
            type="email"
            className={ (emailRegex.test(email) || email.length === 0)
              ? 'effect-5' : 'effect-5 effect-5-error' }
            placeholder="E-mail"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleChange }
          />
          <span className="focus-border" />
        </div>
        <div className="input-focus">
          <input
            name="password"
            type="password"
            placeholder="Senha"
            className={ (password.length >= minPasswordLength || password.length === 0)
              ? 'effect-5' : 'effect-5 effect-5-error' }
            data-testid="password-input"
            value={ password }
            onChange={ this.handleChange }
          />
          <span className="focus-border" />
        </div>
        <button
          type="button"
          className="button-64"
          disabled={ this.isDisabled() }
          onClick={ this.handleLogin }
        >
          <span>
            Entrar
          </span>
        </button>
      </>
    );
  }
}

LoginForm.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(LoginForm);
