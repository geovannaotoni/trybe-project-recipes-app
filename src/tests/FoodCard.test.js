import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './utils/renderWithRouterAndContext';

describe('Teste para o componente FoodCard', () => {
  it('Verifica se, ao clicar no card, ele redireciona para a página de detalhes', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    act(() => {
      history.push('/meals');
    });
    // const beefCategoryFilter = screen.queryByTestId('Beef-category-filter');
    // if (!beefCategoryFilter) {
    //   await waitFor(() => {
    //     expect(screen.getByTestId('Beef-category-filter')).toBeInTheDocument();
    //   });
    // }
    // await waitFor(() => {
    //   const foodCard = screen.getByTestId('0-recipe-card');
    //   userEvent.click(foodCard);
    // });
    // expect(history.location.pathname).toBe('/meals/52977');
    await waitFor(() => {
      expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument();
      userEvent.click(screen.getByTestId('0-recipe-card'));
    });
    expect(history.location.pathname).toBe('/meals/52977');
  });
});
