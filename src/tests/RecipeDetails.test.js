import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import RecipeDetails from '../pages/RecipeDetails/RecipeDetails';

describe('Testes para a página de RecipeDetails', () => {
  test('Se está renderizando corretamente a pagina de meals', () => {
    const { history } = renderWithRouter(<RecipeDetails />);
    expect(history.location.pathname).toBe('/meals');

    const videoElement = screen.queryByTestId('video');
    expect(videoElement).toBeInTheDocument();

    const recipeTitle = screen.getByTestId('recipe-title');
    expect(recipeTitle.textContent).toBe('Spicy Arrabiata Penne');

    const recipePhoto = screen.getByTestId('recipe-photo');
    expect(recipePhoto.getAttribute('alt')).toBe('Spicy Arrabiata Penne');

    const recipeCategory = screen.getByTestId('recipe-category');
    expect(recipeCategory.textContent).toBe('Vegetarian');

    const ingredient = screen.getByTestId('0-ingredient-name-and-measure');
    expect(ingredient.textContent).toBe('Penne Rigate - 1 pound');
  });

  test('Se está renderizando corretamente a pagina de drinks', () => {
    const { history } = renderWithRouter(<RecipeDetails />);
    expect(history.location.pathname).toBe('/drinks');

    const videoElement = screen.queryByTestId('video');
    expect(videoElement).toBeNull();
  });
});
