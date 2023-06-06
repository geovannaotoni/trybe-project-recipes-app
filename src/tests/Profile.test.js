import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndContext from './utils/renderWithRouterAndContext';

describe('Testes para o componente Profile', () => {
  it('Verifica os elementos presentes no profile', () => {
    const { history } = renderWithRouterAndContext(<App />);
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByPlaceholderText(/password/i);
    const btnLogin = screen.getByRole('button', { name: /enter/i });
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();

    userEvent.type(inputEmail, 'teste@trybe.com');
    userEvent.type(inputPassword, '123456789');
    userEvent.click(btnLogin);
    expect(history.location.pathname).toBe('/meals');
    const profile = screen.getByTestId('profile-top-btn');
    userEvent.click(profile);
    expect(history.location.pathname).toBe('/profile');
    const exibirEmail = screen.getByTestId('profile-email');
    expect(exibirEmail).toHaveTextContent('teste@trybe.com');
  });
  it('Verifica se existe os botões', () => {
    const { history } = renderWithRouterAndContext(<App />);
    act(() => {
      history.push('/profile');
    });
    expect(history.location.pathname).toBe('/profile');
    const btnDoneRecipe = screen.getByRole('button', { name: /done recipes/i });
    const btnFavRecipes = screen.getByRole('button', { name: /favorite recipes/i });
    const btnLogout = screen.getByRole('button', { name: /logout/i });
    expect(btnDoneRecipe).toBeInTheDocument();
    expect(btnFavRecipes).toBeInTheDocument();
    expect(btnLogout).toBeInTheDocument();
    userEvent.click(btnDoneRecipe);
    expect(history.location.pathname).toBe('/done-recipes');
    act(() => {
      history.goBack();
    });
    expect(history.location.pathname).toBe('/profile');
    userEvent.click(screen.getByRole('button', { name: /favorite recipes/i }));
    expect(history.location.pathname).toBe('/favorite-recipes');
    act(() => {
      history.goBack();
    });
    userEvent.click(screen.getByRole('button', { name: /logout/i }));
    expect(history.location.pathname).toBe('/');
  });
});
