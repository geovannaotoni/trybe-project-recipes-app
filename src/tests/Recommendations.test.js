import React from 'react';
import { screen } from '@testing-library/react';
import Recommendations from '../components/Recommendations/Recommendations';
import renderWithRouterAndContext from './utils/renderWithRouterAndContext';

test('Renderiza os cards de recomendação corretamente', () => {
  const { history } = renderWithRouterAndContext(<Recommendations />);
  act(() => {
    history.push('/meals/52771');
  });

  const recommendationCards = screen.getAllByTestId(/-recommendation-card$/);
  expect(recommendationCards).toHaveLength(6);

  const recommendationTitles = screen.getAllByTestId(/-recommendation-title$/);
  expect(recommendationTitles).toHaveLength(6);

  const recommendationImages = screen.getAllByRole('img');
  expect(recommendationImages).toHaveLength(6);
});
