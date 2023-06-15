import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import fullHeart from '../../images/blackHeartIcon.svg';
import shareIMG from '../../images/shareIcon.svg';
import emptyHeart from '../../images/whiteHeartIcon.svg';
import { getFromStorage, setOnStorage } from '../../services/localStorage';
import './FavAndShareButtons.css';
import { copyMsg } from '../../services/helpers';

function FavAndShareButtons(props) {
  const history = useHistory();
  const currentPath = history.location.pathname;
  const parts = currentPath.split('/');
  const [, type, id] = parts;
  const [isFavorite, setIsFavorite] = useState(false); // state que verifica se a receita foi favoritada ou não
  // const [linkCopied, setLinkCopied] = useState(false); // state que verifica se o link foi copiado ou não

  const { food } = props;

  useEffect(() => { // Recupera o LS se tiver, verifica se tem a receita favoritada nele e pinta o coração ou cria um novo
    const favoriteRecipes = getFromStorage('favoriteRecipes') || [];
    const isRecipeFavorite = favoriteRecipes.some((recipe) => recipe.id === id);
    setIsFavorite(isRecipeFavorite);
  }, [id]);

  const handleFavorite = async () => { // Função para salvar a receita no LS
    const { idMeal, idDrink, strArea, strCategory, strAlcoholic,
      strDrinkThumb, strMealThumb, strMeal, strDrink } = food;
    const typeSingular = type === 'meals' ? 'meal' : 'drink';
    const favoriteRecipe = {
      id: idMeal || idDrink,
      type: typeSingular,
      nationality: strArea || '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic || '',
      name: strMeal || strDrink,
      image: strDrinkThumb || strMealThumb,
    };
    const favoriteRecipes = getFromStorage('favoriteRecipes') || []; // Pego do LS
    const haveRecipe = favoriteRecipes.some((recipe) => recipe.id === id);
    let newLS;
    if (haveRecipe) {
      newLS = favoriteRecipes.filter((recipe) => recipe.id !== id);
      setIsFavorite(false); // Pintar o coração
    } else {
      setIsFavorite(true); // Pintar o coração
      newLS = [...favoriteRecipes, favoriteRecipe];
      // Exibe mensagem para ir para a página de favs
      const resultMsg = await copyMsg('Salvo nos favoritos!', 'Acessar');
      if (resultMsg.isConfirmed) {
        history.push('/favorite-recipes');
      }
    }
    setOnStorage('favoriteRecipes', newLS); // Salvo no LS
  };

  const handleCopyLink = () => { // Função para copiar o link
    const link = `${window.location.origin}/${type}/${id}`;
    clipboardCopy(link);
    copyMsg();
  };

  return (
    <div className="FavAndShareButtons">
      <button
        onClick={ handleFavorite }
      >
        <img
          src={ isFavorite ? fullHeart : emptyHeart }
          alt="Favorite"
          data-testid="favorite-btn"
        />
      </button>
      <button onClick={ handleCopyLink }>
        <img src={ shareIMG } alt="Share This" data-testid="share-btn" />
      </button>
    </div>
  );
}

FavAndShareButtons.propTypes = {
  food: PropTypes.shape({
    idDrink: PropTypes.number,
    idMeal: PropTypes.number,
    strAlcoholic: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }),
}.isRequired;

export default FavAndShareButtons;
