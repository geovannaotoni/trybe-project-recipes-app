import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Testes para a página de RecipeDetails', () => {
  test('Se está renderizando corretamente a pagina de meals', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals/52771');
    });
    expect(history.location.pathname).toBe('/meals/52771');
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
  test('Se está renderizando corretamente a pagina de drinks', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks/14053');
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
      expect(ingredient.textContent).toBe('Goldschlager - 1 oz');
    });
  });
});
