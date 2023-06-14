import PropTypes from 'prop-types';
import React from 'react';
import './VideoFrame.css';

export default function VideoFrame(props) {
  const { food } = props;

  const getYouTubeVideoId = () => { // função que pega o id do link do video do youtube
    if (food.strYoutube) {
      const videoId = food.strYoutube.split('=')[1]; // separa o link em 2: antes do = e depois do = (um array[antesDo=, depoisDo=])
      return `https://www.youtube.com/embed/${videoId}`; // retorno o id
    }
  };

  return (
    <iframe
      width="100%"
      height="auto"
      src={ getYouTubeVideoId() }
      title={ `How to make ${food.strMeal}` }
      allow="accelerometer; autoplay;
      clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      data-testid="video"
      className="video"
    />
  );
}

VideoFrame.propTypes = {
  food: PropTypes.shape({
    strMeal: PropTypes.string,
    strYoutube: PropTypes.string,
  }),
}.isRequired;
