import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './utils/renderWithRouterAndContext';
import { mealsCategories, mealsData, mealsDataOnly } from './mocks/Meals';

describe('Teste para o componente FoodCard', () => {
  it('Verifica se, ao clicar no card, ele redireciona para a página de detalhes', async () => {
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mealsCategories),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mealsData),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mealsDataOnly),
      });
    const { history } = renderWithRouterAndContext(<App />, '/meals');

    await waitFor(() => {
      expect(screen.getByTestId('Beef-category-filter')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument();
      expect(screen.queryByTestId('13-recipe-card')).not.toBeInTheDocument();
      userEvent.click(screen.getByTestId('0-recipe-card'));
    });
    expect(history.location.pathname).toBe('/meals/53049');
  });
});
