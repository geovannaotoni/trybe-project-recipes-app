import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './utils/renderWithRouterAndContext';

describe('Testes para o componente Footer', () => {
  it('Verifica os elementos presentes no componente', () => {
    const { history } = renderWithRouterAndContext(<App />);
    act(() => {
      history.push('/profile');
    });

    const btnMealIcon = screen.getByTestId('meals-bottom-btn');
    const btnDrinkIcon = screen.getByTestId('drinks-bottom-btn');
    expect(btnMealIcon).toBeInTheDocument();
    expect(btnDrinkIcon).toBeInTheDocument();

    userEvent.click(btnMealIcon);
    expect(history.location.pathname).toBe('/meals');

    act(() => {
      history.goBack();
    });

    userEvent.click(screen.getByTestId('drinks-bottom-btn'));
    expect(history.location.pathname).toBe('/drinks');
  });
});
