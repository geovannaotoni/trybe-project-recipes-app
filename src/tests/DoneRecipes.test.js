import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import clipboardCopy from 'clipboard-copy';
import App from '../App';
import renderWithRouterAndContext from './utils/renderWithRouterAndContext';

const doneRecipes = [{
  id: 'id-01',
  type: 'meal',
  nationality: 'nacionalidade',
  category: 'categoria',
  alcoholicOrNot: '',
  name: 'nome-meal',
  image: 'imagem-da-meal',
  doneDate: '01.01.2021',
  tags: ['1', '2', '3'],
},
{
  id: 'id-02',
  type: 'drink',
  nationality: '',
  category: '',
  alcoholicOrNot: 'alcoholic',
  name: 'nome-drink',
  image: 'imagem-do-drink',
  doneDate: '02.02.2022',
  tags: [],
}];

describe('Testes para o componente DoneRecipes', () => {
  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    jest.spyOn(Object.getPrototypeOf(global.localStorage), 'getItem')
      .mockReturnValue(JSON.stringify(doneRecipes));

    renderWithRouterAndContext(<App />, '/done-recipes');
  });
  afterEach(() => jest.restoreAllMocks());

  it('Verifica os botôes de filtro', async () => {
    const btnAll = screen.getByTestId('filter-by-all-btn');
    const btnMeals = screen.getByTestId('filter-by-meal-btn');
    const btnDrink = screen.getByTestId('filter-by-drink-btn');
    expect(btnAll).toBeInTheDocument();
    expect(btnMeals).toBeInTheDocument();
    expect(btnDrink).toBeInTheDocument();
  });

  it('verifica se renderiza as receitas feitas', async () => {
    doneRecipes.forEach(async (recipe, index) => {
      expect(await screen
        .findByTestId(`${index}-horizontal-image`)).toBeInTheDocument();
      expect(await screen
        .findByTestId(`${index}-horizontal-name`)).toHaveTextContent(recipe.name);
      expect(await screen.findByTestId(`${index}-horizontal-done-date`))
        .toHaveTextContent(recipe.doneDate);
      expect(await screen.findByTestId(`${index}-horizontal-share-btn`))
        .toBeInTheDocument();
      if (recipe.type === 'meal') {
        expect(await screen
          .findByTestId(`${index}-horizontal-top-text`))
          .toHaveTextContent(`${recipe.nationality} - ${recipe.category}`);
        expect(await screen.findByTestId(`${index}-1-horizontal-tag`))
          .toBeInTheDocument();
        expect(await screen.findByTestId(`${index}-2-horizontal-tag`))
          .toBeInTheDocument();
        expect(screen.queryByTestId(`${index}-3-horizontal-tag`))
          .not.toBeInTheDocument();
      } else if (recipe.type === 'drink') {
        expect(await screen.findByTestId(`${index}-horizontal-top-text`)).toHaveTextContent('alcoholic');
      }
    });
  });

  it('verifica se filtra corretamente as comidas ao clicar no botão Meals', async () => {
    const btnMeals = screen.getByTestId('filter-by-meal-btn');
    act(() => {
      userEvent.click(btnMeals);
    });
    doneRecipes.forEach(async (recipe, index) => {
      if (recipe.type === 'meal') {
        expect(await screen
          .findByTestId(`${index}-horizontal-top-text`))
          .toHaveTextContent(`${recipe.nationality} - ${recipe.category}`);
        expect(await screen.findByTestId(`${index}-1-horizontal-tag`))
          .toBeInTheDocument();
        expect(await screen.findByTestId(`${index}-2-horizontal-tag`))
          .toBeInTheDocument();
        expect(screen.queryByTestId(`${index}-3-horizontal-tag`))
          .not.toBeInTheDocument();
      }
      if (recipe.type === 'drink') {
        expect(screen.queryByTestId(`${index}-horizontal-top-text`)).not
          .toBeInTheDocument();
      }
    });
  });

  it('verifica se filtra corretamente as bebidas ao clicar no botão Drinks e retira o filtro ao clicar em All', async () => {
    const firstElementTestId = '0-horizontal-name';
    const btnDrinks = screen.getByTestId('filter-by-drink-btn');

    expect(await screen.findByTestId(firstElementTestId))
      .toHaveTextContent('nome-meal');

    act(() => {
      userEvent.click(btnDrinks);
    });

    waitFor(async () => {
      expect(await screen.findByTestId(firstElementTestId))
        .toHaveTextContent('nome-drink');
    });

    const btnAll = screen.getByTestId('filter-by-all-btn');
    act(() => {
      userEvent.click(btnAll);
    });
    expect(await screen.findByTestId(firstElementTestId))
      .toHaveTextContent('nome-meal');
  });
});

jest.mock('clipboard-copy');
describe('Teste da função clipboard-copy', () => {
  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    jest.spyOn(Object.getPrototypeOf(global.localStorage), 'getItem')
      .mockReturnValue(JSON.stringify(doneRecipes));

    navigator.clipboard = {
      writeText: jest.fn(),
    };

    renderWithRouterAndContext(<App />, '/done-recipes');
  });
  afterEach(() => jest.restoreAllMocks());

  it('Testa se o botão de compartilhar chama a função clipboard-copy', async () => {
    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    act(() => {
      userEvent.click(shareBtn);
    });
    expect(clipboardCopy).toBeCalledWith('http://localhost/meals/id-01');
  });
});
