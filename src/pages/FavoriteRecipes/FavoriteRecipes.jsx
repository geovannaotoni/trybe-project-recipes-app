import React from 'react';
import Header from '../../components/Header/Header';
import useFilterButtons from '../../hooks/useFilterButtons/useFilterButtons';

function FavoriteRecipes() {
  const { filterType, renderButtons } = useFilterButtons();

  return (
    <div>
      <Header pageTitle="Favorite Recipes" />
      { renderButtons() }
      <section>
        {filterType}
      </section>
    </div>
  );
}

export default FavoriteRecipes;
