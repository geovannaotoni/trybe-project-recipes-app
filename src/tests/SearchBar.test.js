import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './utils/renderWithRouterAndContext';
import { mealsDataOnly } from './mocks/Meals';

describe('Testes para o componente SearchBar', () => {
  const searchTopBtn = 'search-top-btn';
  const searchInput = 'search-input';

  it('Verifica se ao selecionar outro radio, o input é limpo', () => {
    const { history } = renderWithRouterAndContext(<App />);
    act(() => {
      history.push('/meals');
    });
    const btnSearchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(btnSearchIcon);

    const searchInputElem = screen.getByTestId(searchInput);
    userEvent.type(searchInputElem, 'banana');

    const nameSearchRadioInput = screen.getByTestId('name-search-radio');
    userEvent.click(nameSearchRadioInput);
    expect(searchInputElem).toHaveTextContent('');
  });
  it('Verifica se, ao selecionar a pesquisa por "First Letter" e digitar mais de um caractere, a aplicação exibe um alerta', () => {
    const alertSpy = jest.spyOn(window, 'alert');

    const { history } = renderWithRouterAndContext(<App />);
    act(() => {
      history.push('/meals');
    });
    const btnSearchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(btnSearchIcon);

    const firstLetterSearchRadioInput = screen.getByTestId('first-letter-search-radio');
    userEvent.click(firstLetterSearchRadioInput);

    const searchInputElem = screen.getByTestId(searchInput);
    userEvent.type(searchInputElem, 'Ba');

    const btnSearchExec = screen.getByTestId('exec-search-btn');
    userEvent.click(btnSearchExec);

    expect(alertSpy).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    alertSpy.mockRestore();
  });
  it('Verifica se, após a pesquisa, ele retorna as receitas de forma correta', () => {

  });
  it('Verifica se, caso o retorno seja uma única receita, ele redireciona para a página de receitas detalhada com o id', () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsDataOnly),
    });

    const { history } = renderWithRouterAndContext(<App />);
    act(() => {
      history.push('/meals');
    });
    const btnSearchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(btnSearchIcon);

    const nameSearchRadioInput = screen.getByTestId('name-search-radio');
    userEvent.click(nameSearchRadioInput);

    const searchInputElem = screen.getByTestId(searchInput);
    userEvent.type(searchInputElem, 'banana');

    const btnSearchExec = screen.getByTestId('exec-search-btn');
    userEvent.click(btnSearchExec);

    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=banana');

    waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52855');
    });

    global.fetch.mockRestore();
  });
});
