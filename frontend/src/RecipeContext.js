import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const RecipeContext = createContext();

export const useRecipes = () => useContext(RecipeContext);

export const RecipeProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:5001/recipes');
                setRecipes(response.data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };
        fetchRecipes();
    }, []);

    const addRecipe = async (recipe) => {
        try {
            const response = await axios.post('http://localhost:5001/recipes', recipe);
            setRecipes(prevRecipes => [...prevRecipes, { ...recipe, id: response.data.id }]);
        } catch (error) {
            console.error("Error adding recipe:", error);
        }
    };

    const deleteRecipe = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/recipes/${id}`);
            setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== id));
        } catch (error) {
            console.error("Error deleting recipe:", error);
        }
    };

    const likeRecipe = async (id, liked) => {
        try {
            await axios.put(`http://localhost:5001/recipes/${id}`, { liked: !liked });
            setRecipes(prevRecipes => 
                prevRecipes.map(recipe => 
                    recipe.id === id ? { ...recipe, liked: !liked } : recipe
                )
            );
        } catch (error) {
            console.error("Error updating liked status:", error);
        }
    };
    const getFilteredRecipes= (searchTerm)=>{
        return searchTerm ? recipes.filter((recipe)=>
            (recipe.name.toLowerCase().includes(searchTerm.toLowerCase()))||
            (recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase()))||
            (recipe.instructions.toLowerCase().includes(searchTerm.toLowerCase()))
        ):recipes;
    }

    return (
        <RecipeContext.Provider value={{ recipes, addRecipe, deleteRecipe, likeRecipe,getFilteredRecipes }}>
            {children}
        </RecipeContext.Provider>
    );
};
