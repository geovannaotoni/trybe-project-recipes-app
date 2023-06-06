import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './utils/renderWithRouterAndContext';

describe('Testes para a página de Login', () => {
  it('Verifica se ao renderizar a tela o botão Enter inicia desabilitado e, após inserir os dados corretos, ele é habilitado', () => {
    const { history } = renderWithRouterAndContext(<App />);
    const btnEnter = screen.getByTestId('login-submit-btn');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    expect(btnEnter).toBeDisabled();

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, '1234567');
    expect(btnEnter).toBeEnabled();

    userEvent.click(btnEnter);
    expect(history.location.pathname).toBe('/meals');
  });
});
