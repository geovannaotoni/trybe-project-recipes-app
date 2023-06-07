import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './utils/renderWithRouterAndContext';
import { mealsCategories, mealsData } from './mocks/Meals';

describe('Teste para o componente FoodCard', () => {
  it('Verifica se, ao clicar no card, ele redireciona para a página de detalhes', async () => {
    const { history } = renderWithRouterAndContext(<App />);

    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mealsCategories),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mealsData),
      });

    act(() => {
      history.push('/meals');
    });
    const beefCategoryFilter = screen.queryByTestId('Beef-category-filter');
    if (!beefCategoryFilter) {
      await waitFor(() => {
        expect(screen.getByTestId('Beef-category-filter')).toBeInTheDocument();
      });
    }
    await waitFor(() => {
      expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument();
      userEvent.click(screen.getByTestId('0-recipe-card'));
    });
    expect(history.location.pathname).toBe('/meals/53049');
  });
});
