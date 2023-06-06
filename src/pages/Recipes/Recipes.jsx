import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FoodCard from '../../components/FoodCard/FoodCard';
import FoodCategories from '../../components/FoodCategories/FoodCategories';
import Header from '../../components/Header/Header';
import Footer from '../../components/footer/Footer';
import RecipesContext from '../../context/RecipesContext';
import { fetchAPI } from '../../services/fetchAPI';
import { API_URL, showError } from '../../services/helpers';

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
    console.log('CARREGOU RECIPES');
    try {
      // CONSUMIR A API DE ACORDO COM O PATHNAME
      const getData = async () => {
        const data = await fetchAPI(API_URL[path].name);
        setResults(data[path]);
      };
      getData();
    } catch (error) {
      showError(error.message);
    }
  }, [pathname]);

  useEffect(() => {
    // Limitar o número de elementos renderizados
    if (results && results.length > API_URL.maxResults) {
      setResults(results.slice(0, API_URL.maxResults));
    }
  }, [results]);

  return (
    <div>
      <Header pageTitle={ API_URL.toCapitalize(pathname) } />
      <FoodCategories />
      {
        results
        && results.map((result, index) => (
          <FoodCard
            key={ index }
            index={ index }
            result={ result }
          />))
      }
      <Footer />
    </div>
  );
}

export default Recipes;
