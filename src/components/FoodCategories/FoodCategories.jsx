import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import { fetchAPI } from '../../services/fetchAPI';
import { API_URL, showError } from '../../services/helpers';
import './FoodCategories.css';

const MAX_CATEGORIES = 5;

export default function FoodCategories() {
  // Context
  const { setResults } = useContext(RecipesContext);
  // History
  const history = useHistory();
  const { location: { pathname } } = history;
  const path = API_URL.toParam(pathname);
  // const pathCap = API_URL.toCapitalize(pathname);
  // const foodType = API_URL.toSingleParam(pathname);
  // State
  const [categories, setCategories] = useState(null);
  const [activeCategory, setActiveCategory] = useState('');
  // Effect
  useEffect(() => {
    const getData = async () => {
      const data = await fetchAPI(API_URL[path].categories);
      const newCategories = data.length > MAX_CATEGORIES
        ? data.slice(0, MAX_CATEGORIES) : data;
      setCategories(newCategories);
    };

    getData();
  }, [path]);

  // Executar o filtro
  const handleClick = async ({ target }) => {
    try {
      setResults(null);
      let data;
      if (target.innerText === 'All' || activeCategory === target.innerText) {
        data = await fetchAPI(API_URL[API_URL.toParam(pathname)].name);
        setActiveCategory('');
      } else {
        const URL = API_URL[path].filter + target.innerText;
        data = await fetchAPI(URL);
        setActiveCategory(target.innerText);
      }
      data = data.length > API_URL.maxResults ? data.slice(0, API_URL.maxResults) : data;
      setResults(data);
    } catch (error) {
      showError(error.message);
    }
  };

  // Ternario para verificar em qual pag ta e retornar a classe para o botão ALL
  const resultpage = categories && categories[0]
    .strCategory === 'Beef' ? 'AllMeals' : 'AllDrinks';

  const resultpage2 = categories && categories[0]
    .strCategory === 'Beef' ? 'FoodCategories' : 'DrinksCategories';

  // Retorno visual
  return (
    <div className={ resultpage2 }>
      <button
        data-testid="All-category-filter"
        onClick={ handleClick }
        className={ resultpage }
      >
        All

      </button>
      {
        categories
        && categories.map(({ strCategory }, index) => (
          <button
            key={ index }
            data-testid={ `${strCategory}-category-filter` }
            onClick={ handleClick }
            className={ strCategory }
          >
            {strCategory}

          </button>
        ))
      }
    </div>
  );
}
