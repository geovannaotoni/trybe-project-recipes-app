import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';

describe('Testes para o componente Footer', () => {
  const searchTopBtn = 'search-top-btn';
  it('Verifica os elementos presentes no componente', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toHaveTextContent('Meals');

    const btnSearchIcon = screen.getByTestId(searchTopBtn);
    expect(btnSearchIcon).toBeInTheDocument();

    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);
    expect(history.location.pathname).toBe('/profile');
    expect(screen.queryByTestId(searchTopBtn)).not.toBeInTheDocument();
  });
  it('Verifica o clique do botão searchIcon', () => {
    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    act(() => {
      history.push('/meals');
    });

    const btnSearchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(btnSearchIcon);

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });
});
