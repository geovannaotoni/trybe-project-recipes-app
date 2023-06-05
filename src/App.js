import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
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
        <Route exact path="/footer" component={ Footer } />
        <Route path="/meals" component={ Recipes } />
        <Route path="/drinks" component={ Recipes } />
        <Route path="/meals/:id-da-receita" component={ RecipeDetails } />
        <Route path="/drinks/:id-da-receita" component={ RecipeDetails } />
        <Route path="/meals/:id-da-receita/in-progress" component={ RecipeInProgress } />
        <Route path="/drinks/:id-da-receita/in-progress" component={ RecipeInProgress } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="/profile" component={ Profile } />
      </Switch>
    </div>
  );
}

export default App;
