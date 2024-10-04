import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RecipeForm from './RecipeForm';
import SearchBar from './SearchBar';
import RecipeDetail from './RecipeDetail';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Favorites from './Favorites';
import { RecipeProvider, useRecipes } from './RecipeContext';
import './styles.css';

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <RecipeProvider>
            <Router>
                <div className="App">
                    <header className="header">
                        <nav className="nav-bar">
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/about">About Us</Link></li>
                                <li><Link to="/contact">Contact Us</Link></li>
                                <li><Link to="/favorites">Favorites</Link></li>
                            </ul>
                        </nav>
                        <h1>OnePot</h1>
                        <div className="search-add-container">
                            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                            <button className="add-recipe-btn" onClick={toggleForm}>
                                Add Recipe
                            </button>
                        </div>
                    </header>

                    {showForm && <RecipeForm toggleForm={toggleForm} />}

                    <Routes>
                        <Route path="/" element={<RecipeList searchTerm={searchTerm} />} />
                        <Route path="/recipe/:id" element={<RecipeDetail/>} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/contact" element={<ContactUs />} />
                        <Route path="/favorites" element={<Favorites />} />
                    </Routes>

                    <footer className="footer">
                        <p>OnePot - Share your best recipes with the world!</p>
                    </footer>
                </div>
            </Router>
        </RecipeProvider>
    );
}

const RecipeList = ({searchTerm}) => {
    const { recipes, likeRecipe, deleteRecipe,getFilteredRecipes } = useRecipes();
    const filteredRecipes=getFilteredRecipes(searchTerm);
    return (
        <div className="recipe-container">
            {filteredRecipes.map((recipe) => (
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
                        <button className="delete-recipe-btn" onClick={() => deleteRecipe(recipe.id)}>
                            🗑️
                        </button>
                    </div>
                </div>
            ))}
            {recipes.length === 0 && <p>No recipes found.</p>}
        </div>
    );
};

export default App;
