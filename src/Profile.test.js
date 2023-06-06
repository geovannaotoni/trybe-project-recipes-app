import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from './App';
import renderWithRouter from './tests/utils/renderWithRouter';

describe('Testes para o componente Profile', () => {
//   it('Verifica os elementos presentes no profile', () => {
//     const { history } = renderWithRouter(<App />);
//     const inputEmail = screen.getByRole('textbox');
//     const inputPassword = screen.getByPlaceholderText(/password/i);
//     const btnLogin = screen.getByRole('button', {
//       name: /enter/i,
//     });
//     expect(inputEmail).toBeInTheDocument();
//     expect(inputPassword).toBeInTheDocument();

  //     userEvent.type(inputEmail, 'teste@trybe.com');
  //     userEvent.type(inputPassword, '123456789');
  //     userEvent.click(btnLogin);
  //     expect(history.location.pathname).toBe('/meals');
  //     const profiles = screen.getByTestId('profile-top-btn');
  //     console.log(profiles);
  //     userEvent.click(profiles);
  //     // act(() => {
  //     //   history.push('/profile');
  //     // });
  //     // expect(history.location.pathname).toBe('/profile');
  //     // const exibirEmail = screen.getByText(/tryber@teste\.com/i);
  //     // expect(exibirEmail).toBeInTheDocument();
  //   });
  it('Verifica se existe os botões', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/profile');
    });
    expect(history.location.pathname).toBe('/profile');
    const btnDoneRecipe = screen.getByRole('button', {
      name: /done recipes/i,
    });
    const btnFavRecipes = screen.getByRole('button', {
      name: /favorite recipes/i,
    });
    const btnLogout = screen.getByRole('button', {
      name: /logout/i,
    });
    expect(btnDoneRecipe).toBeInTheDocument();
    expect(btnFavRecipes).toBeInTheDocument();
    expect(btnLogout).toBeInTheDocument();
    userEvent.click(btnDoneRecipe);
    expect(history.location.pathname).toBe('/done-recipes');
    act(() => {
      history.goBack();
    });
    // expect(history.location.pathname).toBe('/profile');
    userEvent.click(btnFavRecipes);
    // expect(history.location.pathname).toBe('/favorite-recipes');
    act(() => {
      history.goBack();
    });
    userEvent.click(btnLogout);
    expect(history.location.pathname).toBe('/');
  });
});
