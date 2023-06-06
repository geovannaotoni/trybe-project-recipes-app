import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import RecipesContext from '../../context/RecipesContext';
import { fetchAPI } from '../../services/fetchAPI';
import { API_URL } from '../../services/helpers';

const MAX_CATEGORIES = 5;

export default function FoodCategories() {
  // Context
  // const { setResults } = useContext(RecipesContext);
  // History
  const history = useHistory();
  const { location: { pathname } } = history;
  const path = API_URL.toParam(pathname);
  // const pathCap = API_URL.toCapitalize(pathname);
  // const foodType = API_URL.toSingleParam(pathname);
  // State
  const [categories, setCategories] = useState(null);
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
  return (
    <div className="FoodCategories">
      {
        categories
        && categories.map(({ strCategory }, index) => (
          <button
            key={ index }
            data-testid={ `${strCategory}-category-filter` }
          >
            {strCategory}

          </button>
        ))
      }
    </div>
  );
}
