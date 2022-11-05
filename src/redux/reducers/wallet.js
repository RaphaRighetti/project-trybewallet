// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { getCurrenciesAction, getEditIdAction,
  removeExpanseAction, saveExpanseAction, submitEditAction } from '../actions';

const initialState = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  currentId: 0,
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case getCurrenciesAction: {
    return {
      ...state,
      currencies: action.dataKeys,
    };
  }

  case saveExpanseAction: {
    return {
      ...state,
      expenses: [...state.expenses, {
        id: state.currentId,
        value: action.cashValue === '' ? '0' : action.cashValue,
        description: action.description,
        currency: action.currency,
        method: action.method,
        tag: action.tag,
        exchangeRates: action.data,
      }],
      currentId: state.currentId + 1,
    };
  }

  case removeExpanseAction: {
    return {
      ...state,
      expenses: [...action.newExpenses],
    };
  }

  case getEditIdAction: {
    return {
      ...state,
      idToEdit: action.id,
      editor: true,
    };
  }

  case submitEditAction: {
    return {
      ...state,
      editor: false,
      expenses: [...action.expenses],
    };
  }
  default: {
    return state;
  }
  }
};

export default wallet;
