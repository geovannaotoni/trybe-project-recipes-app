import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import { getFromStorage } from '../../services/localStorage';
import useFilterButtons from '../../hooks/useFilterButtons/useFilterButtons';
import useRecipeCards from '../../hooks/useRecipeCards/useRecipeCards';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const { filterType, renderButtons } = useFilterButtons();
  const { renderRecipeCard } = useRecipeCards();

  useEffect(() => {
    const doneRecipesFromStorage = getFromStorage('doneRecipes');
    if (doneRecipesFromStorage) {
      setDoneRecipes(doneRecipesFromStorage);
    }
  }, []);

  return (
    <div>
      <Header pageTitle="Done Recipes" />
      { renderButtons() }
      <section>
        {
          doneRecipes
            .filter((recipe) => recipe.type.includes(filterType))
            .map((recipe, index) => (
              <article key={ index }>
                {renderRecipeCard(recipe, index)}
              </article>
            ))
        }
      </section>
    </div>
  );
}

export default DoneRecipes;
