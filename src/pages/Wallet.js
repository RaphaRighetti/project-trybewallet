import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import './styles/Wallet.css';
import { getEditIdAct, saveExpanseAct, submitEditAct } from '../redux/actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      description: '',
      tag: 'Alimentação',
      cashValue: '',
      method: 'Dinheiro',
      currency: 'USD',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleButton = () => {
    const { dispatch } = this.props;
    dispatch(saveExpanseAct(this.state));
    this.setState({ description: '', cashValue: '' });
  };

  editMode = (id) => {
    const { expenses, dispatch } = this.props;
    dispatch(getEditIdAct(id));
    const selectedExpense = expenses.find((e) => e.id === id);
    this.setState({
      description: selectedExpense.description,
      tag: selectedExpense.tag,
      cashValue: selectedExpense.value,
      method: selectedExpense.method,
      currency: selectedExpense.currency,
    });
  };

  handleEdit = () => {
    const { idToEdit, expenses, dispatch } = this.props;
    const { description, tag, cashValue, method, currency } = this.state;
    const editedExpanses = expenses.map((e) => {
      if (idToEdit === e.id) {
        return {
          ...e,
          description,
          tag,
          method,
          currency,
          value: cashValue,
        };
      }
      return e;
    });
    dispatch(submitEditAct(editedExpanses));
    this.setState({ description: '', cashValue: '' });
  };

  render() {
    const { description, tag, cashValue, method, currency } = this.state;
    const { editor } = this.props;
    return (
      <div className="walletContainer">
        <div className="headerContainer">
          <Header />
          <WalletForm
            description={ description }
            tag={ tag }
            cashValue={ cashValue }
            method={ method }
            currency={ currency }
            handleChange={ this.handleChange }
          />
          <div className="header-button">
            {!editor ? (
              <button type="button" className="button-64" onClick={ this.handleButton }>
                <span>Adicionar despesa</span>
              </button>)
              : (
                <button type="button" className="button-64" onClick={ this.handleEdit }>
                  <span>Editar despesa</span>
                </button>)}
          </div>
        </div>
        <div className="wallet-content-container">
          <Table editMode={ this.editMode } />
        </div>
      </div>
    );
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({ currency: PropTypes.string })).isRequired,
  idToEdit: PropTypes.number.isRequired,
  editor: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
  editor: state.wallet.editor,
});

export default connect(mapStateToProps)(Wallet);
