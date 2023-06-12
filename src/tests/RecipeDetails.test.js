import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import oneMeal from '../../cypress/mocks/oneMeal';
import App from '../App';
// import RecipeDetails from '../pages/RecipeDetails/RecipeDetails';
import renderWithRouterAndContext from './utils/renderWithRouterAndContext';
import { dataDrinks, drinksDataOnly } from './mocks/Drinks';
import { mealsDataOnly } from './mocks/Meals';

const URL_MEAL = '/meals/52771';

describe('Testes para a página de RecipeDetails', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  test('Se está renderizando corretamente a página de meals', async () => {
    // mocka os fetchs para não consumir a API --> primeiro o componente Recommendations renderiza e após retorna para o Details
    // então o mock é dos drinks e depois da refeição única
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(oneMeal),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(dataDrinks),
      });
    renderWithRouterAndContext(<App />, URL_MEAL);

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

  test('Se está renderizando corretamente a página de drinks', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(drinksDataOnly),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(dataDrinks),
      });
    const { history } = renderWithRouterAndContext(<App />, '/drinks/14053');
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

  test('Se está renderizando corretamente a página de meals usando mock', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mealsDataOnly),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(dataDrinks),
      });

    const { history } = renderWithRouterAndContext(<App />, '/meals/52855');
    expect(history.location.pathname).toBe('/meals/52855');

    await waitFor(() => {
      expect(screen.getByText('Banana Pancakes')).toBeInTheDocument();
      expect(screen.getByText(/in a bowl, mash the banana with a fork until it resembles a thick purée\. stir in the eggs, baking powder and vanilla\. heat a large non-stick frying pan or pancake pan over a medium heat and brush with half the oil\. using half the batter, spoon two pancakes into the pan, cook for 1-2 mins each side, then tip onto a plate\. repeat the process with the remaining oil and batter\. top the pancakes with the pecans and raspberries\./i)).toBeInTheDocument();
      // expect(screen.getByText('Breakfast,Desert,Sweet')).toBeInTheDocument();
      expect(screen.getByText(/banana - 1 large/i)).toBeInTheDocument();
      expect(screen.getByText(/eggs - 2 medium/i)).toBeInTheDocument();
      expect(screen.getByText(/baking powder - pinch/i)).toBeInTheDocument();
      expect(screen.getByText(/vanilla extract - spinkling/i)).toBeInTheDocument();
    });
  });

  test('Teste as recomendações', () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(oneMeal),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(dataDrinks),
      });
    renderWithRouterAndContext(<App />, URL_MEAL);
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
