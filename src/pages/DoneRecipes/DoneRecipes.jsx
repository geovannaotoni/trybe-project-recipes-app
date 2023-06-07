import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    const doneRecipesFromStorage = getFromStorage('doneRecipes');
    if (doneRecipesFromStorage) {
      setDoneRecipes(doneRecipesFromStorage);
    }
  }, []);

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
              <p data-testid={ `${index}-horizontal-top-text` }>
                {recipe.category }
              </p>
              <p data-testid={ `${index}-horizontal-name` }>
                {recipe.name }
              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>
                {recipe.doneDate }
              </p>
              <button type="button" data-testid={ `${index}-horizontal-share-btn` }>
                <img
                  src={ shareIconImage }
                  alt="Share Icon"
                />
              </button>
              {recipe.tags.map((tag) => (
                <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                  {tag}
                </span>
              ))}
            </article>
          ))
        }
      </section>
    </div>
  );
}

export default DoneRecipes;
