import React from 'react';
import { RecipeList, RecipeFilter } from '../components';

const RecipesPage: React.FC = () => {
  return (
    <div className="recipes-page">
      <h1>Коллекция рецептов</h1>
      <RecipeFilter />
      <RecipeList />
    </div>
  );
};

export default RecipesPage;