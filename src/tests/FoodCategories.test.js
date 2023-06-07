import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './utils/renderWithRouterAndContext';
import { mealsCategories, mealsData } from './mocks/Meals';

describe('Teste para o componente FoodCategories', () => {
  it('Verifica se ele realiza os filtros corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mealsCategories),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mealsData),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({
          meals: [
            {
              strMeal: 'Mbuzi Choma (Roasted Goat)',
              strMealThumb: 'https://www.themealdb.com/images/media/meals/cuio7s1555492979.jpg',
              idMeal: '52968',
            },
          ],
        }),
      });

    const { history } = renderWithRouterAndContext(<App />);
    act(() => {
      history.push('/meals');
    });
    await waitFor(() => {
      expect(screen.getByTestId('Goat-category-filter')).toBeInTheDocument();
      userEvent.click(screen.getByTestId('Goat-category-filter'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument();
      expect(screen.getByTestId('0-recipe-card')).toHaveTextContent('Mbuzi Choma (Roasted Goat)');
    });
    global.fetch.mockRestore();
  });
});
