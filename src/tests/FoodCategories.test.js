import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './utils/renderWithRouterAndContext';

describe('Teste para o componente FoodCategories', () => {
  it('Verifica se ele realiza os filtros corretamente', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    act(() => {
      history.push('/meals');
    });
    await waitFor(() => {
      expect(screen.getByTestId('Goat-category-filter')).toBeInTheDocument();
    });
    userEvent.click(screen.getByTestId('Goat-category-filter'));
    await waitFor(() => {
      expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument();
    });
  });
});
