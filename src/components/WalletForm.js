import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletForm extends React.Component {
  render() {
    const { currencies, description, tag,
      cashValue, method, currency, handleChange } = this.props;
    return (
      <div className="walletFormBox">
        <div className="input-focus max-width-235">
          <label htmlFor="description-input">
            Descrição da despesa:
            <input
              type="text"
              className="effect-6"
              data-testid="description-input"
              id="description-input"
              name="description"
              value={ description }
              onChange={ handleChange }
            />
            <span className="focus-border" />
          </label>
        </div>
        <div className="input-focus max-width-235 height-56">
          <label htmlFor="tag-input">
            Categoria da despesa:
            <select
              data-testid="tag-input"
              id="tag-input"
              className="tag-input"
              name="tag"
              value={ tag }
              onChange={ handleChange }
            >
              <option value="Alimentação">
                Alimentação
              </option>
              <option value="Lazer">
                Lazer
              </option>
              <option value="Trabalho">
                Trabalho
              </option>
              <option value="Transporte">
                Transporte
              </option>
              <option value="Saúde">
                Saúde
              </option>
            </select>
          </label>
        </div>
        <div className="value-container">
          <div className="input-focus max-width-100">
            <label htmlFor="value-input">
              Valor:
              <input
                type="number"
                className="effect-6"
                data-testid="value-input"
                id="value-input"
                name="cashValue"
                value={ cashValue }
                onChange={ handleChange }
              />
              <span className="focus-border" />
            </label>
          </div>
        </div>
        <div className="input-focus max-width-235 height-56">
          <label htmlFor="method-input">
            Método de pagamento:
            <select
              data-testid="method-input"
              id="method-input"
              className="tag-input"
              name="method"
              value={ method }
              onChange={ handleChange }
            >
              <option value="Dinheiro">
                Dinheiro
              </option>
              <option value="Cartão de crédito">
                Cartão de crédito
              </option>
              <option value="Cartão de débito">
                Cartão de débito
              </option>
            </select>
          </label>
        </div>
        <div className="input-focus max-width-235 height-56">
          <label
            htmlFor="currency-input"
            className="currency-label"
          >
            Moeda:
            <select
              data-testid="currency-input"
              id="currency-input"
              className="tag-input"
              name="currency"
              value={ currency }
              onChange={ handleChange }
            >
              {currencies.length > 0 && currencies.map((e, i) => (
                <option key={ `${e}-${i}` } value={ e }>
                  {e}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  description: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  cashValue: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
