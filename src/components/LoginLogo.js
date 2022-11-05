import React from 'react';
import WalletLogo from './WalletLogo';

class LoginLogo extends React.Component {
  render() {
    return (
      <div className="loginLogo">
        <div className="walletBox">
          <WalletLogo />
        </div>
        <span className="trybe">
          Trybe
        </span>
        <span className="wallet">
          Wallet
        </span>
      </div>
    );
  }
}

export default LoginLogo;
