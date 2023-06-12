import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import useFilterButtons from '../../hooks/useFilterButtons/useFilterButtons';
import useRecipeCards from '../../hooks/useRecipeCards/useRecipeCards';
import favoriteBlackIcon from '../../images/blackHeartIcon.svg';
import { getFromStorage, setOnStorage } from '../../services/localStorage';

function FavoriteRecipes() {
  const { filterType, renderButtons } = useFilterButtons();
  const { shareBtn, renderRecipeCard } = useRecipeCards();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const favoriteRecipesFromStorage = getFromStorage('favoriteRecipes');
    if (favoriteRecipesFromStorage) {
      setFavoriteRecipes(favoriteRecipesFromStorage);
    }
  }, []);
  const handleFavorite = (recipe) => {
    const newFavoriteList = favoriteRecipes.filter((favRecipe) => (
      favRecipe.id !== recipe.id
    ));
    setOnStorage('favoriteRecipes', newFavoriteList);
    setFavoriteRecipes(newFavoriteList);
  };

  return (
    <div>
      <Header pageTitle="Favorite Recipes" />
      { renderButtons() }
      <section>
        {
          favoriteRecipes
            .filter((recipe) => recipe.type.includes(filterType))
            .map((recipe, index) => (
              <article key={ index }>
                {renderRecipeCard(recipe, index)}
                <button onClick={ () => handleFavorite(recipe) } type="button">
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ favoriteBlackIcon }
                    alt="favoriteIco"
                  />
                </button>
              </article>
            ))
        }
        { shareBtn && <p>Link copied!</p>}
      </section>
    </div>
  );
}

export default FavoriteRecipes;
