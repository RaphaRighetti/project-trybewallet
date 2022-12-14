import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BsFillTrashFill } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import '../pages/styles/table.css';
import PropTypes from 'prop-types';
import { removeExpanseAct } from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses, dispatch, editMode } = this.props;
    return (
      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>
                Descrição
              </th>
              <th>
                Tag
              </th>
              <th>
                Método de pagamento
              </th>
              <th>
                Valor
              </th>
              <th>
                Moeda
              </th>
              <th>
                Câmbio utilizado
              </th>
              <th>
                Valor convertido
              </th>
              <th>
                Moeda de conversão
              </th>
              <th>
                Editar/Excluir
              </th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 && expenses.map((e) => (
              <tr key={ e.id }>
                <td>
                  {e.description}
                </td>
                <td>
                  {e.tag}
                </td>
                <td>
                  {e.method}
                </td>
                <td>
                  {e.value.includes('.')
                    ? parseFloat(e.value).toFixed(2) : `${e.value}.00`}
                </td>
                <td>
                  {e.exchangeRates[e.currency].name}
                </td>
                <td>
                  {parseFloat(e.exchangeRates[e.currency].ask).toFixed(2)}
                </td>
                <td>
                  {(parseFloat(e.value)
                  * parseFloat(e.exchangeRates[e.currency].ask)).toFixed(2)}
                </td>
                <td>
                  Real
                </td>
                <td className="tableBtns">
                  <button
                    type="button"
                    className="editIcon"
                    data-testid="edit-btn"
                    onClick={ () => editMode(e.id) }
                  >
                    <FiEdit />
                  </button>
                  <button
                    type="button"
                    className="trashIcon"
                    data-testid="delete-btn"
                    onClick={ () => dispatch(removeExpanseAct(e.id, expenses)) }
                  >
                    <BsFillTrashFill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({ currency: PropTypes.string })).isRequired,
  dispatch: PropTypes.func.isRequired,
  editMode: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currentId: state.wallet.currentId,
});

export default connect(mapStateToProps)(Table);
