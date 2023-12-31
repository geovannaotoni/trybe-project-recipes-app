import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FoodCard from '../../components/FoodCard/FoodCard';
import FoodCategories from '../../components/FoodCategories/FoodCategories';
import Header from '../../components/Header/Header';
import Footer from '../../components/footer/Footer';
import RecipesContext from '../../context/RecipesContext';
import { fetchAPI } from '../../services/fetchAPI';
import { API_URL, showError } from '../../services/helpers';
import './Recipes.css';

function Recipes() {
  // History
  const history = useHistory();
  const { location: { pathname } } = history;
  const path = API_URL.toParam(pathname);
  // Context
  const { results, setResults } = useContext(RecipesContext);
  // State

  // Effect
  useEffect(() => {
    // console.log('CARREGOU RECIPES');
    try {
      // CONSUMIR A API DE ACORDO COM O PATHNAME
      const getData = async () => {
        const data = await fetchAPI(API_URL[path].name);
        // console.log('recipes', data);
        if (data.length > API_URL.maxResults) {
          setResults(data.slice(0, API_URL.maxResults));
        } else {
          setResults(data);
        }
      };
      getData();
    } catch (error) {
      showError(error.message);
    }
  }, [path, setResults]);

  return (
    <div className="mainRecipes">
      <Header pageTitle={ API_URL.toCapitalize(pathname) } />
      <FoodCategories />
      <div className="bodyRecipes">
        {
          results
        && results.map((result, index) => (
          <FoodCard
            key={ index }
            result={ result }
            testCard={ `${index}-recipe-card` }
            testImg={ `${index}-card-img` }
            testTitle={ `${index}-card-name` }
          />))
        }

      </div>
      <Footer />
    </div>
  );
}

export default Recipes;
