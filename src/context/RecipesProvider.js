import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [results, setResults] = useState(null);

  const valueContext = useMemo(() => ({ results, setResults }), [results]);

  return (
    <RecipesContext.Provider value={ valueContext }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
