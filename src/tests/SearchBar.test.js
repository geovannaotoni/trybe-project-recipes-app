import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './utils/renderWithRouterAndContext';
import { mealsCategories, mealsData, mealsDataOnly } from './mocks/Meals';

describe('Testes para o componente SearchBar', () => {
  const searchTopBtn = 'search-top-btn';
  const searchInput = 'search-input';
  const nameSearchRadio = 'name-search-radio';
  const execSearchBtn = 'exec-search-btn';
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Verifica se ao selecionar outro radio, o input é limpo', () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mealsCategories),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mealsData),
      });
    renderWithRouterAndContext(<App />, '/meals');
    const btnSearchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(btnSearchIcon);

    const searchInputElem = screen.getByTestId(searchInput);
    userEvent.type(searchInputElem, 'banana');

    const nameSearchRadioInput = screen.getByTestId(nameSearchRadio);
    userEvent.click(nameSearchRadioInput);
    expect(searchInputElem).toHaveTextContent('');
  });
  it('Verifica se, ao selecionar a pesquisa por "First Letter" e digitar mais de um caractere, a aplicação exibe um alerta', () => {
    const alertSpy = jest.spyOn(window, 'alert');

    renderWithRouterAndContext(<App />, '/meals');
    const btnSearchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(btnSearchIcon);

    const firstLetterSearchRadioInput = screen.getByTestId('first-letter-search-radio');
    userEvent.click(firstLetterSearchRadioInput);

    const searchInputElem = screen.getByTestId(searchInput);
    userEvent.type(searchInputElem, 'Ba');

    const btnSearchExec = screen.getByTestId(execSearchBtn);
    userEvent.click(btnSearchExec);

    expect(alertSpy).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    alertSpy.mockRestore();
  });

  it('Verifica se, após a pesquisa, caso não encontre nenhum resultado, ele exibe um alert', async () => {
    const alertSpy = jest.spyOn(window, 'alert');
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mealsCategories),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mealsData),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({
          meals: null,
        }),
      });

    renderWithRouterAndContext(<App />, '/meals');
    const btnSearchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(btnSearchIcon);

    const nameSearchRadioInput = screen.getByTestId(nameSearchRadio);
    userEvent.click(nameSearchRadioInput);

    const searchInputElem = screen.getByTestId(searchInput);
    userEvent.type(searchInputElem, 'bananas');

    const btnSearchExec = screen.getByTestId(execSearchBtn);
    userEvent.click(btnSearchExec);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledTimes(1);
      expect(alertSpy).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    });

    alertSpy.mockRestore();
    global.fetch.mockRestore();
  });

  it('Verifica se, caso o retorno seja uma única receita, ele redireciona para a página de receitas detalhada com o id', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsDataOnly),
    });

    const { history } = renderWithRouterAndContext(<App />, '/meals');
    const btnSearchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(btnSearchIcon);

    const nameSearchRadioInput = screen.getByTestId(nameSearchRadio);
    userEvent.click(nameSearchRadioInput);

    const searchInputElem = screen.getByTestId(searchInput);
    userEvent.type(searchInputElem, 'banana');

    const btnSearchExec = screen.getByTestId(execSearchBtn);
    userEvent.click(btnSearchExec);

    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=banana');

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52855');
    });

    global.fetch.mockRestore();
  });
});
