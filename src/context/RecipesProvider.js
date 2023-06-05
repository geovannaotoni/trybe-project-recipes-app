import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [meals, setMeals] = useState(null);
  
  const valueContext = useMemo(() => ({ meals, setMeals }), [meals]);

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
