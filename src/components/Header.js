import React, { Component } from 'react';
import { GiPayMoney } from 'react-icons/gi';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BiUserCircle } from 'react-icons/bi';
import LoginLogo from './LoginLogo';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const totalExpenses = expenses.length === 0 ? '0.00' : (expenses
      .reduce((acc, curr) => ((parseFloat(acc) + (parseFloat(curr.value)
      * parseFloat(curr.exchangeRates[curr.currency].ask))).toFixed(2)), 0));
    return (
      <div className="headerBox">
        <LoginLogo />
        <div className="totalSpent">
          <GiPayMoney />
          <span>
            Total de despesas:
            {' '}
          </span>
          <span data-testid="total-field">
            {totalExpenses}
          </span>
          <span data-testid="header-currency-field">
            {' '}
            BRL
          </span>
        </div>
        <div className="loggedEmail">
          <BiUserCircle />
          <span data-testid="email-field">{email}</span>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({ currency: PropTypes.string })).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
