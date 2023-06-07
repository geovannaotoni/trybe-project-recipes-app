import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndContext from './utils/renderWithRouterAndContext';

describe('Testes para o componente DoneRecipes', () => {
  beforeEach(() => {
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
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    jest.spyOn(Object.getPrototypeOf(global.localStorage), 'getItem')
      .mockReturnValue(JSON.stringify(doneRecipes));
    const { history } = renderWithRouterAndContext(<App />);
    act(() => {
      history.push('/done-recipes');
    });
  });
  it('Verifica os botôes de filtro', async () => {
    const btnAll = screen.getByTestId('filter-by-all-btn');
    const btnMeals = screen.getByTestId('filter-by-meal-btn');
    const btnDrink = screen.getByTestId('filter-by-drink-btn');
    expect(btnAll).toBeInTheDocument();
    expect(btnMeals).toBeInTheDocument();
    expect(btnDrink).toBeInTheDocument();
  });
  it('verifica se renderiza as receitas feitas', async () => {
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
      alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
      name: 'nome-drink',
      image: 'imagem-do-drink',
      doneDate: '02.02.2022',
      tags: [],
    }];

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
  it('verifica se filtra corretamente as comida quando clicada no mils', async () => {
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
      alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
      name: 'nome-drink',
      image: 'imagem-do-drink',
      doneDate: '02.02.2022',
      tags: [],
    }];
    const btnMeals = screen.getByTestId('filter-by-meal-btn');
    act(() => {
      userEvent.click(btnMeals);
    });
    // waitForElementToBeRemoved(() => {
    //   screen.queryByText('nome-drink');
    // });
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
      } else if (recipe.type === 'drink') {
        expect(await screen.findByTestId(`${index}-horizontal-top-text`))
          .toBeInTheDocument();
      }
    });
  });
});
