import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import oneMeal from '../../cypress/mocks/oneMeal';
import App from '../App';
import RecipeDetails from '../pages/RecipeDetails/RecipeDetails';
import renderWithRouterAndContext from './utils/renderWithRouterAndContext';
import { dataDrinks, drinksDataOnly } from './mocks/Drinks';

const URL_MEAL = '/meals/52771';

describe('Testes para a página de RecipeDetails', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  test('Se está renderizando corretamente a página de meals', async () => {
    // mocka os fetchs para não consumir a API --> primeiro o componente Recommendations renderiza e após retorna para o Details
    // então o mock é dos drinks e depois da refeição única
    //
    renderWithRouterAndContext(<App />, URL_MEAL);
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(oneMeal),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(dataDrinks),
      });

    await waitFor(() => {
      const recipeTitle = screen.getByTestId('recipe-title');
      expect(recipeTitle.textContent).toBe('Spicy Arrabiata Penne');
    });
    await waitFor(() => {
      const recipePhoto = screen.getByTestId('recipe-photo');
      expect(recipePhoto.getAttribute('alt')).toBe('Spicy Arrabiata Penne');
    });
    await waitFor(() => {
      const recipeCategory = screen.getByTestId('recipe-category');
      expect(recipeCategory.textContent).toBe('Vegetarian');
    });
    await waitFor(() => {
      const ingredient = screen.getByTestId('0-ingredient-name-and-measure');
      expect(ingredient.textContent).toBe('penne rigate - 1 pound');
    });
    await waitFor(() => {
      const video = screen.queryByTestId('video');
      expect(video).toBeInTheDocument();
    });
  });

  test.skip('Se está renderizando corretamente a página de drinks', async () => {
    const { history } = renderWithRouterAndContext(<App />, '/drinks/14053');
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(drinksDataOnly),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(dataDrinks),
      });
    const title = 'Mother\'s Milk';
    expect(history.location.pathname).toBe('/drinks/14053');
    const videoElement = screen.queryByTestId('video');
    expect(videoElement).toBeNull();
    await waitFor(() => {
      const recipeTitle = screen.getByTestId('recipe-title');
      expect(recipeTitle.textContent).toBe(title);
    });
    await waitFor(() => {
      const recipePhoto = screen.getByTestId('recipe-photo');
      expect(recipePhoto.getAttribute('alt')).toBe(title);
    });
    await waitFor(() => {
      const recipeCategory = screen.getByTestId('recipe-category');
      expect(recipeCategory.textContent).toBe('Alcoholic');
    });
    await waitFor(() => {
      const ingredient = screen.getByTestId('0-ingredient-name-and-measure');
      expect(ingredient).toHaveTextContent('Goldschlager - 1 oz');
    });
  });

  test.skip('Se está renderizando corretamente a página de meals usando mock', async () => {
    const { history } = renderWithRouterAndContext(
      <RecipeDetails id="52855" type="meals" />,
      '/meals/52855',
    );

    expect(history.location.pathname).toBe('/meals/52855');

    await waitFor(() => {
      expect(screen.getByText('Banana Pancakes')).toBeInTheDocument();
      expect(screen.getByText('In a bowl, mash the banana with a fork until it resembles a thick purée. Stir in the eggs, baking powder and vanilla.')).toBeInTheDocument();
      expect(screen.getByText('Breakfast,Desert,Sweet')).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
      expect(screen.getByText('Eggs')).toBeInTheDocument();
      expect(screen.getByText('Baking Powder')).toBeInTheDocument();
      expect(screen.getByText('Vanilla Extract')).toBeInTheDocument();
    });
  });

  test.skip('Teste as recomendações', () => {
    renderWithRouterAndContext(<App />, '/meals/52771');
    waitFor(async () => {
      const recommendationCards = await screen.findAllByTestId(/recommendation-card/i);
      expect(recommendationCards).toHaveLength(6);
      const recommendationTitles = await screen.findAllByTestId(/recommendation-title/i);
      expect(recommendationTitles).toHaveLength(6);
      const recommendationImages = await screen.findAllByRole('img');
      expect(recommendationImages).toHaveLength(6);
    });
  });
});
