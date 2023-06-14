import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { fetchAPI } from '../../services/fetchAPI';
import { API_URL } from '../../services/helpers';
import FoodCard from '../FoodCard/FoodCard';
import './Recommendation.css';

function Recommendations() {
  const history = useHistory();
  const { pathname } = history.location;
  const type = pathname.includes('meals') ? 'drinks' : 'meals';
  const [recommendations, setRecommendations] = useState([]);
  const maxRecommendations = 6;

  useEffect(() => {
    const fetchRecommendations = async () => {
      const data = await fetchAPI(API_URL[type].name);
      if (data.length > maxRecommendations) {
        setRecommendations(data.slice(0, maxRecommendations));
      } else {
        setRecommendations(data);
      }
    };

    fetchRecommendations();
  }, [type]);

  return (
    <div className="carousel-container">
      {
        recommendations.map((rec, index) => (
          <div key={ index }>
            <FoodCard
              result={ rec }
              index={ index }
              testCard={ `${index}-recommendation-card` }
              testTitle={ `${index}-recommendation-title` }
            />
          </div>
        ))
      }
    </div>
  );
}

export default Recommendations;
