import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import Swal from 'sweetalert2';
import App from '../App';
import { showError } from '../services/helpers';
import { mealsCategories } from './mocks/Meals';
import renderWithRouterAndContext from './utils/renderWithRouterAndContext';

describe('Teste para a page Recipes', () => {
  it('Verifica o tratamento de erro', async () => {
    renderWithRouterAndContext(<App />, '/meals');

    const showErrorSpy = jest.spyOn(Swal, 'fire');

    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mealsCategories),
      })
      .mockRejectedValueOnce(new Error('API error'));

    await waitFor(() => {
      expect(screen.getByTestId('Beef-category-filter')).toBeInTheDocument();
    });

    await showError('API error');

    expect(showErrorSpy).toHaveBeenCalled();
  });
});
