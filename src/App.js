import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login/Login';
import Meals from './pages/Meals/Meals';
import Drinks from './pages/Drinks/Drinks';
import Profile from './pages/Profile/Profile';
import DoneRecipes from './pages/DoneRecipes/DoneRecipes';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/meals" component={ Meals } />
        <Route path="/drinks" component={ Drinks } />
        {/* <Route path="/meals/:id-da-receita" component={RecipeDetails}/> */}
        {/* <Route path="/drinks/:id-da-receita" component={RecipeDetails}/> */}
        {/* <Route path="/meals/:id-da-receita/in-progress" component={RecipeInProgress}/> */}
        {/* <Route path="/drinks/:id-da-receita/in-progress" component={RecipeInProgress}/> */}
        <Route path="/done-recipes" component={ DoneRecipes } />
        {/* <Route path="/favorite-recipes" component={FavoriteRecipes}/> */}
        <Route path="/profile" component={ Profile } />
      </Switch>
    </div>
  );
}

export default App;
