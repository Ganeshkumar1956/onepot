import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecipes } from './RecipeContext';
import './styles.css'; // Import your CSS styles

function RecipeDetail() {
  const { recipes } = useRecipes();
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === parseInt(id));

  if (!recipe) {
    return <div className="recipe-not-found">Recipe not found</div>;
  }
  const base_url="http://localhost:3000/"
  return (
    <div className="recipe-detail">
      <h2 className="recipe-title">{recipe.name}</h2>
      <img src={`${base_url}${recipe.image}`} alt={recipe.name} className="recipe-image" />
      <div className="recipe-info">
        <p className="recipe-ingredients"><strong>Ingredients</strong></p>
        <div className='ingredients-div'>
          <ul className="ingredients-list">
          {
            recipe.ingredients.split('\n').map((ingredient, index) => (
              <li key={index}>{ingredient.trim()}</li>
            ))
          }
          </ul>
        </div>
        
        <p className="recipe-instructions"><strong>Instructions</strong></p>
        <ul className="ingredients-list">
      {
        recipe.instructions.split('\n').map((instructions, index) => (
          <li key={index}>{instructions.trim()}</li>
        ))
      }
    </ul>
      </div>
    </div>
  );
}

export default RecipeDetail;
