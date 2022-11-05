// Coloque aqui suas actions
export const loginAction = 'loginAction';
export const getCurrenciesAction = 'getCurrenciesAction';
export const saveExpanseAction = 'saveExpanseAction';
export const removeExpanseAction = 'removeExpanseAction';
export const getEditIdAction = 'getEditIdAction';
export const submitEditAction = 'submitEditAction';

export const loginAct = (email) => ({
  type: loginAction,
  email,
});

export const getCurrenciesAct = () => async (dispatch) => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(url);
  const data = await response.json();
  const dataKeys = Object.keys(data).filter((e) => e !== 'USDT');
  dispatch({
    type: getCurrenciesAction,
    dataKeys,
  });
};

export const saveExpanseAct = (obj) => async (dispatch) => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(url);
  const data = await response.json();
  dispatch({
    type: saveExpanseAction,
    data,
    ...obj,
  });
};

export const removeExpanseAct = (id, expenses) => {
  const newExpenses = expenses.filter((e) => e.id !== id);
  return {
    type: removeExpanseAction,
    newExpenses,
  };
};

export const getEditIdAct = (id) => ({
  type: getEditIdAction,
  id,
});

export const submitEditAct = (expenses) => ({
  type: submitEditAction,
  expenses,
});
