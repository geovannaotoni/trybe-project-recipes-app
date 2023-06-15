import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import { getFromStorage } from '../../services/localStorage';
import useFilterButtons from '../../hooks/useFilterButtons/useFilterButtons';
import useRecipeCards from '../../hooks/useRecipeCards/useRecipeCards';
import './DoneRecipes.css';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const { filterType, renderButtons } = useFilterButtons();
  const { shareBtn, renderRecipeCard } = useRecipeCards();

  useEffect(() => {
    const doneRecipesFromStorage = getFromStorage('doneRecipes');
    if (doneRecipesFromStorage) {
      setDoneRecipes(doneRecipesFromStorage);
    }
  }, []);

  return (
    <div className="mainFAV">
      <Header pageTitle="Done Recipes" />
      { renderButtons() }
      <section className="FAVCardsArea">
        {
          doneRecipes
            .filter((recipe) => recipe.type.includes(filterType))
            .map((recipe, index) => (
              <div key={ index } className="cardDR" name={ recipe.type }>
                {renderRecipeCard(recipe, index)}
              </div>
            ))
        }
        { shareBtn }
      </section>
    </div>
  );
}

export default DoneRecipes;
