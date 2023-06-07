import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';

import { fetchAPI } from '../../services/fetchAPI';
import './Recommendation.css';

function Recommendations() {
  const history = useHistory();
  const [recommendations, setRecommendations] = useState([]);
  const maxRecommendations = 6;

  useEffect(() => {
    const fetchRecommendations = async () => {
      const currentPath = history.location.pathname;
      const isMealPage = currentPath.includes('/meals');

      // Define o endpoint de acordo com o tipo oposto ao da página atual
      const endpoint = isMealPage
        ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
        : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

      try {
        const data = await fetchAPI(endpoint);

        // Define as recomendações com base nos dados retornados
        const recommendedRecipes = isMealPage ? data.drinks : data.meals;
        setRecommendations(recommendedRecipes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecommendations();
  }, [history.location.pathname]);

  const reducerRecommendations = recommendations.slice(0, maxRecommendations);
  console.log(reducerRecommendations.length);

  return (
    <div className="carousel-container">
      <Swiper
        slidesPerView={ 2 }
        slidesPerGroup={ 2 }
        spaceBetween={ 10 }
        navigation
        pagination
      >
        {reducerRecommendations.map((recipe, index) => (
          <SwiperSlide
            key={ recipe.idMeal || recipe.idDrink }
            data-testid={ `${index}-recommendation-card` }
            className="carousel-slide-item"
          >
            <p data-testid={ `${index}-recommendation-title` }>
              {recipe.strMeal || recipe.strDrink}
            </p>
            <img
              src={ recipe.strDrinkThumb || recipe.strMealThumb }
              alt={ recipe.strMeal || recipe.strDrink }
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Recommendations;
