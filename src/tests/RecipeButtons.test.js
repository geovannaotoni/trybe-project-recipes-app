import React from 'react';
import { screen, render, act } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import RecipeButtons from '../components/RecipeButtons/RecipeButtons';

describe('Testes para RecipeButtons', () => {
  const line = '/meals/52771';
  const testId = 'start-recipe-btn';
  test('Renderiza corretamente o botão "Start Recipe" quando o status da receita é vazio', async () => {
    const history = createMemoryHistory();
    history.push(line);

    render(
      <Router history={ history }>
        <RecipeButtons />
      </Router>,
    );

    await act(async () => {
      const startButton = await screen.findByTestId(testId);
      expect(startButton).toBeInTheDocument();
      expect(startButton.textContent).toBe('Start Recipe');
    });
  });

  test('Renderiza corretamente o botão "Continue Recipe" quando o status da receita é "started"', async () => {
    const history = createMemoryHistory();
    history.push(line);

    localStorage.setItem('inProgressRecipes', JSON.stringify({ 52771: {} }));

    render(
      <Router history={ history }>
        <RecipeButtons />
      </Router>,
    );

    await act(async () => {
      const continueButton = await screen.findByTestId(testId);
      expect(continueButton).toBeInTheDocument();
      expect(continueButton.textContent).toBe('Continue Recipe');
    });
  });

  test('Não renderiza nenhum botão quando o status da receita é "finished"', async () => {
    const history = createMemoryHistory();
    history.push(line);

    localStorage.setItem(
      'doneRecipes',
      JSON.stringify([{ id: '52771', title: 'Spicy Arrabiata Penne' }]),
    );

    render(
      <Router history={ history }>
        <RecipeButtons />
      </Router>,
    );

    await act(async () => {
      const buttons = screen.queryAllByTestId(testId);
      expect(buttons.length).toBe(0);
    });
  });
});
