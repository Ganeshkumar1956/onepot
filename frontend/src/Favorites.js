import React from 'react';
import { Link } from 'react-router-dom';
import { useRecipes } from './RecipeContext';

function Favorites() {
    const { recipes, likeRecipe } = useRecipes();
    const favorites = recipes.filter(recipe => recipe.liked);

    return (
        <div className="favorites-container">
            <h2 className="favorites-title">Favorite Recipes</h2>
            <div className="recipe-container">
                {favorites.length > 0 ? (
                    favorites.map(recipe => (
                        <div className="recipe-card" key={recipe.id}>
                            <img src={recipe.image} alt={recipe.name} style={{width:'300px', height:'300px'}}/>
                            <h2>{recipe.name}</h2>
                            <div className="button-container">
                                <button className="heart-btn" onClick={() => likeRecipe(recipe.id, recipe.liked)}>
                                    {recipe.liked ? '❤️' : '🤍'}
                                </button>
                                <Link to={`/recipe/${recipe.id}`}>
                                    <button className="view-recipe-btn">View Recipe</button>
                                </Link>
                                <button className="delete-recipe-btn">🗑️</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No favorites found.</p>
                )}
            </div>
        </div>
    );
}

export default Favorites;
