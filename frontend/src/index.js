import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Import the main App component
import './styles.css'; // Import the CSS styles
import { RecipeProvider } from './RecipeContext';

// Render the App component inside the root div
ReactDOM.render(
    <React.StrictMode>
        <RecipeProvider>
        <App />
        </RecipeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
