import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

const email = 'raphael@trybe.com';
const coinNames = Object.keys(mockData).filter((e) => e !== 'USDT');

describe('testa tela de login', () => {
  it('testa se botão inicia desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const btn = screen.getByRole('button', { name: /entrar/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toBeDisabled();
  });

  it('testa se ao colocar um email e senha validos o botão fica enabled', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const btn = screen.getByRole('button', { name: /entrar/i });
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, '123456');
    expect(btn).not.toBeDisabled();
    userEvent.click(btn);
    expect(history.location.pathname).toBe('/carteira');
  });
});

describe('testa tela da carteira', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const btn = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, '123456');
    userEvent.click(btn);
  });

  it('espera que o email logado, seja o mesmo colocado no login', () => {
    const emailElement = screen.getByText(email);
    expect(emailElement).toHaveTextContent(email);
  });

  it('verifica se a tag select possui a sigla de todas moedas', async () => {
    const coinInput = screen.getByTestId('currency-input');
    expect(coinInput).toBeInTheDocument();
    await waitFor(() => {
      coinNames.forEach((e) => {
        userEvent.selectOptions(coinInput, e);
        expect(coinInput.value).toBe(e);
      });
    }, { timeout: 1000 });
  });

  it('testa se ao inserir uma despesa, o valor total aumenta', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ json: () => mockData });
    const totalElement = screen.getByText(/0\.00/i);
    const valueInput = screen.getByRole('spinbutton', { name: /valor:/i });
    const addBtn = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(addBtn).not.toBeDisabled();
    const descriptionValue = screen.getByRole('textbox', { name: /descrição da despesa:/i });

    await act(async () => {
      userEvent.type(descriptionValue, 'descrição');
      userEvent.type(valueInput, '7');
      userEvent.click(addBtn);
    });

    expect(totalElement).toHaveTextContent('33.27');

    // const expenseValue = screen.getByRole('cell', { name: /7\.00/i });
    const editBtn = screen.getByTestId('edit-btn');
    const trashBtn = screen.getByTestId('delete-btn');

    userEvent.click(editBtn);
    const submitEditBtn = screen.getByRole('button', { name: /editar despesa/i });
    expect(submitEditBtn).toBeInTheDocument();
    userEvent.type(descriptionValue, 'nova descrição');
    userEvent.click(submitEditBtn);
    const expenseDescription = screen.getByRole('cell', { name: /nova descrição/i });
    expect(expenseDescription).toBeInTheDocument();

    userEvent.click(trashBtn);
    expect(trashBtn).not.toBeInTheDocument();
    expect(editBtn).not.toBeInTheDocument();
  });
});
