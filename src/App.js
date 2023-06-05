import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login/Login';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        {/* <Route path="/meals" component={Recipes} /> */}
        {/* <Route path="/drinks" component={Recipes} /> */}
        {/* <Route path="/meals/:id-da-receita" component={RecipeDetails}/> */}
        {/* <Route path="/drinks/:id-da-receita" component={RecipeDetails}/> */}
        {/* <Route path="/meals/:id-da-receita/in-progress" component={RecipeInProgress}/> */}
        {/* <Route path="/drinks/:id-da-receita/in-progress" component={RecipeInProgress}/> */}
        {/* <Route path="/done-recipes" component={DoneRecipes}/> */}
        {/* <Route path="/favorite-recipes" component={FavoriteRecipes}/> */}
        {/* <Route path="/profile" component={Profile}/> */}
      </Switch>
    </div>
  );
}

export default App;
