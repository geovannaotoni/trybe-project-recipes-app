import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import DoneRecipes from './pages/DoneRecipes/DoneRecipes';
import Recipes from './pages/Recipes/Recipes';
import RecipeDetails from './pages/RecipeDetails/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress/RecipeInProgress';
import FavoriteRecipes from './pages/FavoriteRecipes/FavoriteRecipes';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals/:id-da-receita" component={ RecipeDetails } />
        <Route exact path="/drinks/:id-da-receita" component={ RecipeDetails } />
        <Route
          exact
          path="/meals/:id-da-receita/in-progress"
          component={ RecipeInProgress }
        />
        <Route
          exact
          path="/drinks/:id-da-receita/in-progress"
          component={ RecipeInProgress }
        />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/profile" component={ Profile } />
      </Switch>
    </div>
  );
}

export default App;
