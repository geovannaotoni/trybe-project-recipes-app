import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import { fetchAPI } from '../../services/fetchAPI';
import { API_URL, showError } from '../../services/helpers';

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
      const newCategories = data[path].length > MAX_CATEGORIES
        ? data[path].slice(0, MAX_CATEGORIES) : data[path];
      setCategories(newCategories);
    };

    getData();
  }, [pathname]);

  // Executar o filtro
  const handleClick = async ({ target }) => {
    try {
      setResults(null);
      if (target.innerText === 'All' || activeCategory === target.innerText) {
        const data = await fetchAPI(API_URL[API_URL.toParam(pathname)].name);
        setResults(data[path]);
        setActiveCategory('');
      } else {
        // console.log('ANTES', API_URL[path].filter + target.innerText);
        const URL = API_URL[path].filter + target.innerText;
        console.log(URL);
        const data = await fetchAPI(URL);
        console.log('DEPOIS', data[path]);
        setResults(data[path]);
        setActiveCategory(target.innerText);
      }
    } catch (error) {
      showError(error.message);
    }
  };

  // Retorno visual
  return (
    <div className="FoodCategories">
      <button
        data-testid="All-category-filter"
        onClick={ handleClick }
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
          >
            {strCategory}

          </button>
        ))
      }
    </div>
  );
}
