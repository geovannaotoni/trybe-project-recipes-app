import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FavAndShareButtons from '../../components/FavAndShareButtons/FavAndShareButtons';
import RecipeContent from '../../components/RecipeContent/RecipeContent';
import Recommendations from '../../components/Recommendations/Recommendations';
import { fetchAPI } from '../../services/fetchAPI';
import { API_URL } from '../../services/helpers';
import './RecipeDetails.css';

function RecipeDetails() {
  const history = useHistory();
  const { pathname } = history.location;
  const [, type, id] = pathname.split('/');
  const [food, setFood] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchAPI(API_URL[type].single + id);
      setFood(data[0]);
    };
    getData();
  }, [id, type]);

  return (
    <div className="mainRecipeDetails">
      {
        food && (
          <>
            <FavAndShareButtons food={ food } />
            <RecipeContent food={ food } />
            <Recommendations />

          </>
        )
      }
    </div>
  );
}

export default RecipeDetails;
