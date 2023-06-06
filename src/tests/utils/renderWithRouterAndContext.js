import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import RecipesProvider from '../../context/RecipesProvider';

const renderWithRouterAndContext = (component, path = '/') => {
  const history = createMemoryHistory({ initialEntries: [path] });
  return ({
    ...render(
      <RecipesProvider>
        <Router history={ history }>
          {component}
        </Router>
      </RecipesProvider>,
    ),
    history,
  });
};
export default renderWithRouterAndContext;
