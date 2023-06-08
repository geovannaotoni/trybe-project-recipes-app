// Testes

import React from 'react';
import { screen, act } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Testes para a página de RecipeDetails', () => {
  test('Se está renderizando corretamente a pagina de meals', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals/52771');
    });
    expect(history.location.pathname).toBe('/meals/52771');

    const recipeTitle = screen.getByTestId('recipe-title');
    expect(recipeTitle.textContent).toBe('Spicy Arrabiata Penne');
  });

  const recipePhoto = screen.getByTestId('recipe-photo');
  expect(recipePhoto.getAttribute('alt')).toBe('Spicy Arrabiata Penne');
});

const recipeCategory = screen.getByTestId('recipe-category');
expect(recipeCategory.textContent).toBe('Vegetarian');

const ingredient = screen.getByTestId('0-ingredient-name-and-measure');
expect(ingredient.textContent).toBe('penne rigate - 1 pound');

const video = screen.queryByTestId('video');
expect(video).toBeInTheDocument();
test('Se está renderizando corretamente a pagina de drinks', async () => {
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push('/drinks/14053');
  });
  const title = 'Mother\'s Milk';
  expect(history.location.pathname).toBe('/drinks/14053');
  const videoElement = screen.queryByTestId('video');
  expect(videoElement).toBeNull();

  const recipeTitle = screen.getByTestId('recipe-title');
  expect(recipeTitle.textContent).toBe(title);

  const recipePhoto = screen.getByTestId('recipe-photo');
  expect(recipePhoto.getAttribute('alt')).toBe(title);

  expect(recipeCategory.textContent).toBe('Alcoholic');

  expect(ingredient.textContent).toBe('Goldschlager - 1 oz');
});
