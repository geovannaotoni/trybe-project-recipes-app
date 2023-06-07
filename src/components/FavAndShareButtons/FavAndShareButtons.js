import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import clipboardCopy from 'clipboard-copy';

import './FavAndShareButtons.css';
import shareIMG from '../../images/shareIcon.svg';
import emptyHeart from '../../images/whiteHeartIcon.svg';
import fullHeart from '../../images/blackHeartIcon.svg';
import { setOnStorage, getFromStorage } from '../../services/localStorage';

function FavAndShareButtons({ element, type, ids }) {
  const { idMeal, idDrink, strArea,
    strCategory, strAlcoholic, strDrinkThumb, strMealThumb } = element;
  const [isFavorite, setIsFavorite] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const favoriteRecipes = getFromStorage('favoriteRecipes') || [];

    const isRecipeFavorite = favoriteRecipes.some(
      async (recipe) => await recipe.id === idMeal || await recipe.id === idDrink,
    );

    setIsFavorite(isRecipeFavorite);
  }, [idMeal, idDrink]);

  const handleFavorite = (event) => {
    const { target: { id, name } } = event;
    const favoriteRecipe = {
      id,
      type: name,
      nationality: strArea || '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic || '',
      name: idDrink || idMeal,
      image: strDrinkThumb || strMealThumb,
    };

    setIsFavorite(!isFavorite); // Pintar o coração
    // const favoriteRecipes = getFromStorage('favoriteRecipes'); // Pego do LS
    setOnStorage('favoriteRecipes', favoriteRecipe); // Salvo no LS
  };

  const resetLinkCopied = () => {
    setLinkCopied(false);
  };

  const handleCopyLink = () => {
    const Wait = 2000;
    const link = window.location.href;
    clipboardCopy(link);
    setLinkCopied(true);
    setTimeout(resetLinkCopied, Wait);
  };

  console.log('11');

  return (
    <div className="mainFavAndShareButtons">
      <button onClick={ handleFavorite } id={ ids } name={ type }>
        <img src={ isFavorite ? fullHeart : emptyHeart } alt="Favorite" />
      </button>
      <button onClick={ handleCopyLink }>
        <img src={ shareIMG } alt="Share This" />
      </button>
      {linkCopied && <p>Link copiado para o clipboard!</p>}
    </div>
  );
}

FavAndShareButtons.propTypes = {
  element: PropTypes.shape({
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
  type: PropTypes.string.isRequired,
  ids: PropTypes.string.isRequired,
};

export default FavAndShareButtons;
