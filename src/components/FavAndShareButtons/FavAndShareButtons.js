import React, { useState, useEffect } from 'react';
import clipboardCopy from 'clipboard-copy';

import { useHistory } from 'react-router-dom';
import './FavAndShareButtons.css';
import shareIMG from '../../images/shareIcon.svg';
import emptyHeart from '../../images/whiteHeartIcon.svg';
import fullHeart from '../../images/blackHeartIcon.svg';
import { setOnStorage, getFromStorage } from '../../services/localStorage';
import { fetchAPI } from '../../services/fetchAPI';

function FavAndShareButtons() {
  const history = useHistory();
  const currentPath = history.location.pathname;
  const parts = currentPath.split('/');
  const [, type, id] = parts;
  const [isFavorite, setIsFavorite] = useState(false); // state que verifica se a receita foi favoritada ou não
  const [linkCopied, setLinkCopied] = useState(false); // state que verifica se o link foi copiado ou não
  const [element, setElement] = useState({}); // state que salva uma copia nova da api da receita

  useEffect(() => { // requisição a api para pegar as informações da receita (não consegui passar por props)
    const returnRote = async () => {
      if (type === 'meals') {
        const meals = await fetchAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        setElement(meals.meals); // estou setando o state element um objeto com o retono da requisição a API com as informações do meals obs.: {meals: [{}]}
      } else if (type === 'drinks') {
        const drinks = await fetchAPI(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        setElement(drinks.drinks); // estou setando o state element um objeto com o retono da requisição a API com as informações do drink obs.: {drinks: [{}]}
      }
    };
    returnRote(); // Chamando a função para fazer a requisição da API com os parametros: Type: meals ou drinks e o id do produto
  }, [id, type]); // usando type e id como parametro

  useEffect(() => { // Recupera o LS se tiver, verifica se tem a receita favoritada nele e pinta o coração ou cria um novo
    const favoriteRecipes = getFromStorage('favoriteRecipes');

    if (favoriteRecipes !== null) {
      const isRecipeFavorite = favoriteRecipes.some((recipe) => recipe.id === id);
      if (isRecipeFavorite === true) {
        setIsFavorite(true);
      }
    } else {
      setOnStorage('favoriteRecipes', []);
    }
  }, [id]);

  const handleFavorite = () => { // Função para salvar a receita no LS
    const { idMeal, idDrink, strArea, strCategory, strAlcoholic,
      strDrinkThumb, strMealThumb, strMeal, strDrink } = element[0];
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
    const favoriteRecipes = getFromStorage('favoriteRecipes'); // Pego do LS
    if (favoriteRecipes !== null) {
      console.log('Dentro do primeiro IF', isFavorite);
      const haveRecipe = favoriteRecipes.some((recipe) => recipe.id === id);
      if (haveRecipe === true) {
        console.log('Dentro do segundo IF', isFavorite);
        const newLS = favoriteRecipes.filter((recipe) => recipe.id !== id);
        setIsFavorite(false); // Pintar o coração
        setOnStorage('favoriteRecipes', newLS); // Salvo no LS
      } else {
        console.log('Dentro do else', isFavorite);
        setIsFavorite(true); // Pintar o coração
        const newLS = [...favoriteRecipes, favoriteRecipe];
        setOnStorage('favoriteRecipes', newLS); // Salvo no LS
      }
    }
  };

  const resetLinkCopied = () => { // Função para resetar o state de link copiado
    setLinkCopied(false);
  };

  const handleCopyLink = () => { // Função para copiar o link
    const Wait = 2000;
    const link = window.location.href;
    clipboardCopy(link);
    setLinkCopied(true);
    global.alert('Link copied!');
    setTimeout(resetLinkCopied, Wait);
  };

  return (
    <div className="mainFavAndShareButtons">
      <button
        onClick={ handleFavorite }
        value={ id }
        name={ type }
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
      {linkCopied && <p>Link copied!</p>}
    </div>
  );
}

export default FavAndShareButtons;
