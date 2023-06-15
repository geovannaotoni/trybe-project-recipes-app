import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import useFilterButtons from '../../hooks/useFilterButtons/useFilterButtons';
import useRecipeCards from '../../hooks/useRecipeCards/useRecipeCards';
import favoriteBlackIcon from '../../images/blackHeartIcon.svg';
import { getFromStorage, setOnStorage } from '../../services/localStorage';
import './FavoriteRecipes.css';

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
    <div className="mainRDones">
      <Header pageTitle="Favorite Recipes" />
      { renderButtons() }
      <section className="DRCardsArea">
        {
          favoriteRecipes
            .filter((recipe) => recipe.type.includes(filterType))
            .map((recipe, index) => (
              <div key={ index } className="cardFav" name={ recipe.type }>
                {renderRecipeCard(recipe, index)}
                <button
                  onClick={ () => handleFavorite(recipe) }
                  type="button"
                  className="btnFav"
                  name={ recipe.type }
                >
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ favoriteBlackIcon }
                    alt="favoriteIco"
                  />
                </button>
              </div>
            ))
        }
        { shareBtn }
      </section>
    </div>
  );
}

export default FavoriteRecipes;
