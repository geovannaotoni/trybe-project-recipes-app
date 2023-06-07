import React, { useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import Header from '../../components/Header/Header';
import { getFromStorage } from '../../services/localStorage';
import shareIconImage from '../../images/shareIcon.svg';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([{
    id: 'id-da-receita',
    type: 'meal',
    nationality: 'nacionalidade-da-receita-ou-texto-vazio',
    category: 'categoria-da-receita-ou-texto-vazio',
    alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
    name: 'nome-da-receita',
    image: 'imagem-da-receita',
    doneDate: 'quando-a-receita-foi-concluida',
    tags: ['1', '2'],
  }]);
  const [shareBtn, setShareBtn] = useState(false);

  useEffect(() => {
    const doneRecipesFromStorage = getFromStorage('doneRecipes');
    if (doneRecipesFromStorage) {
      setDoneRecipes(doneRecipesFromStorage);
    }
  }, []);

  const handleShare = (recipe) => {
    const currentDomain = window.location.origin;
    clipboardCopy(`${currentDomain}/${recipe.type}s/${recipe.id}`);
    setShareBtn(true);
  };

  return (
    <div>
      <Header pageTitle="Done Recipes" />
      <section>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </section>
      <section>
        {
          doneRecipes.map((recipe, index) => (
            <article key={ index }>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
              <p data-testid={ `${index}-horizontal-name` }>
                {recipe.name }
              </p>
              {
                recipe.type === 'meal' && (
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    { `${recipe.nationality} - ${recipe.category}` }
                  </p>
                )
              }
              {
                recipe.type === 'drink' && (
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    { recipe.alcoholicOrNot }
                  </p>
                )
              }
              <p data-testid={ `${index}-horizontal-done-date` }>
                {recipe.doneDate }
              </p>
              <button type="button" onClick={ () => handleShare(recipe) }>
                <img
                  src={ shareIconImage }
                  alt="Share Icon"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
              {recipe.tags.map((tag) => (
                <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                  {tag}
                </span>
              ))}
              { shareBtn && <p>Link copied!</p>}
            </article>
          ))
        }
      </section>
    </div>
  );
}

export default DoneRecipes;
