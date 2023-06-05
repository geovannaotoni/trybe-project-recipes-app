import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Header from '../../components/Header/Header';

function Recipes() {
  const history = useHistory();
  const { location: { pathname } } = history;
  let title = '';
  if (pathname === '/meals') {
    title = 'Meals';
  }
  if (pathname === '/drinks') {
    title = 'Drinks';
  }
  return (
    <div>
      <Header pageTitle={ title } />
      <Footer />
    </div>
  );
}

export default Recipes;
