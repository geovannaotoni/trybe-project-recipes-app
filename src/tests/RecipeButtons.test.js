import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndContext from './utils/renderWithRouterAndContext';
import App from '../App';
import { mealsDataOnly } from './mocks/Meals';
import { dataDrinks } from './mocks/Drinks';
// import RecipeButtons from '../components/RecipeButtons/RecipeButtons';

describe('Testes para RecipeButtons', () => {
  const url = '/meals/52855';
  const testId = 'start-recipe-btn';
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  it('Renderiza corretamente o botão "Start Recipe" quando o status da receita é vazio', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mealsDataOnly),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(dataDrinks),
      });
    renderWithRouterAndContext(<App />, url);

    await waitFor(() => {
      const startButton = screen.getByTestId(testId);
      expect(startButton).toHaveTextContent('Start Recipe');
    });
  });

  it('Renderiza corretamente o botão "Continue Recipe" quando o status da receita é "started"', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: {}, meals: { 52855: ['Banana'] } }));
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mealsDataOnly),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(dataDrinks),
      });
    renderWithRouterAndContext(<App />, url);

    await waitFor(() => {
      const continueButton = screen.getByTestId(testId);
      expect(continueButton).toHaveTextContent('Continue Recipe');
    });
  });

  test('Não renderiza nenhum botão quando o status da receita é "finished"', async () => {
    localStorage.setItem(
      'doneRecipes',
      JSON.stringify({ drinks: {}, meals: { 52855: ['Banana', 'Eggs', 'Baking Powder', 'Vanilla Extract', 'Oil', 'Pecan Nuts', 'Raspberries'] } }),
    );
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mealsDataOnly),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(dataDrinks),
      });
    renderWithRouterAndContext(<App />, url);

    await waitFor(() => {
      const buttons = screen.queryAllByTestId(testId);
      expect(buttons.length).toBe(0);
    });
    global.fetch.mockRestore();
  });
});
