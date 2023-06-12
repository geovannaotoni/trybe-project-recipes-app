import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndContext from './utils/renderWithRouterAndContext';

jest.mock('clipboard-copy');

describe('Testes para o componente FavoriteRecipes', () => {
  const favRecipes = [
    { id: '53060',
      type: 'meal',
      image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
      name: 'Burek',
      nationality: 'Croatian',
      category: 'Side',
      alcoholicOrNot: '' },
    {
      id: '53065',
      type: 'meal',
      image: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
      name: 'Sushi',
      nationality: 'Japanese',
      category: 'Seafood',
      alcoholicOrNot: '' },
  ];

  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favRecipes));
    jest.spyOn(Object.getPrototypeOf(global.localStorage), 'getItem')
      .mockReturnValue(JSON.stringify(favRecipes));

    navigator.clipboard = {
      writeText: jest.fn(),
    };
    renderWithRouterAndContext(<App />, '/favorite-recipes');
  });
  afterEach(() => jest.restoreAllMocks());

  it('Verifica se é desfavoritado', () => {
    const testid = '1-horizontal-image';
    const img2 = screen.queryByTestId(testid);
    expect(img2).toBeInTheDocument();
    const btnDesfav = screen.queryByTestId('1-horizontal-favorite-btn');
    userEvent.click(btnDesfav);
    expect(screen.queryByTestId(testid)).not.toBeInTheDocument();
  });
  it('Verifica se é compartilhado', () => {
    const btnSearch = screen.queryByTestId('1-horizontal-share-btn');
    userEvent.click(btnSearch);
    expect(screen.getByText(/Link copied!/i)).toBeInTheDocument();
  });
});
