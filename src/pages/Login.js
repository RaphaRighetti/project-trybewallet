import React from 'react';
import PropTypes from 'prop-types';
import './styles/login.css';
import './styles/inputs.css';
import './styles/buttons.css';
import LoginForm from '../components/LoginForm';
import LoginLogo from '../components/LoginLogo';

class Login extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div className="loginContainer">
        <div className="loginBox">
          <LoginLogo />
          <LoginForm history={ history } />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Login;
