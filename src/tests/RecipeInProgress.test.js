import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndContext from './utils/renderWithRouterAndContext';
import { mealsDataOnly } from './mocks/Meals';

describe('Teste para a página Receitas em Progresso', () => {
  it('', async () => {
    renderWithRouterAndContext(<App />, '/meals/52855/in-progress');
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mealsDataOnly),
      });
    expect(await screen.findByTestId('recipe-title')).toHaveTextContent('Banana Pancakes');
    global.fetch.mockRestore();
  });
});
