const sqlite3=require('sqlite3')
const dBname='database.db'

const createTables = () => {
    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS Users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            profile_picture_url TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `;

    const createRecipesTable = `
        CREATE TABLE IF NOT EXISTS Recipes (
            recipe_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            description TEXT,
            ingredients TEXT,
            instructions TEXT,
            prep_time INTEGER,
            cook_time INTEGER,
            total_time INTEGER,
            image_url TEXT,
            cuisine_id INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES Users(user_id),
            FOREIGN KEY (cuisine_id) REFERENCES Cuisines(cuisine_id)
        );
    `;

    const createBlogTable = `
        CREATE TABLE IF NOT EXISTS Blog (
            blog_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            body TEXT,
            image_url TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES Users(user_id)
        );
    `;

    const createCuisinesTable = `
        CREATE TABLE IF NOT EXISTS Cuisines (
            cuisine_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT
        );
    `;

    const createTagsTable = `
        CREATE TABLE IF NOT EXISTS Tags (
            tag_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT
        );
    `;

    const createRecipeTagsTable = `
        CREATE TABLE IF NOT EXISTS RecipeTags (
            recipe_id INTEGER NOT NULL,
            tag_id INTEGER NOT NULL,
            PRIMARY KEY (recipe_id, tag_id),
            FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id),
            FOREIGN KEY (tag_id) REFERENCES Tags(tag_id)
        );
    `;

    const createFavoritesTable = `
        CREATE TABLE IF NOT EXISTS Favorites (
            user_id INTEGER NOT NULL,
            recipe_id INTEGER NOT NULL,
            PRIMARY KEY (user_id, recipe_id),
            FOREIGN KEY (user_id) REFERENCES Users(user_id),
            FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id)
        );
    `;

    const createRecipeReviewsTable = `
        CREATE TABLE IF NOT EXISTS RecipeReviews (
            review_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            recipe_id INTEGER NOT NULL,
            rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
            comment TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES Users(user_id),
            FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id)
        );
    `;
    const createBlogReviewsTable = `
        CREATE TABLE IF NOT EXISTS BlogReviews (
            review_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            blog_id INTEGER NOT NULL,
            comment TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES Users(user_id)
        );
    `;

    const createIngredientsTable = `
        CREATE TABLE IF NOT EXISTS Ingredients (
            ingredient_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `;

    const createRecipeIngredientsTable = `
        CREATE TABLE IF NOT EXISTS RecipeIngredients (
            recipe_id INTEGER NOT NULL,
            ingredient_id INTEGER NOT NULL,
            quantity TEXT NOT NULL,
            unit TEXT,
            PRIMARY KEY (recipe_id, ingredient_id),
            FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id),
            FOREIGN KEY (ingredient_id) REFERENCES Ingredients(ingredient_id)
        );
    `;

    const createLikesTable = `
        CREATE TABLE IF NOT EXISTS Likes (
            user_id INTEGER NOT NULL,
            recipe_id INTEGER NOT NULL,
            PRIMARY KEY (user_id, recipe_id),
            FOREIGN KEY (user_id) REFERENCES Users(user_id),
            FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id)
        );
    `;

    const tables = [
        { sql: createUsersTable, name: 'Users' },
        { sql: createRecipesTable, name: 'Recipes' },
        { sql: createBlogTable, name: 'Blog' },
        { sql: createCuisinesTable, name: 'Cuisines' },
        { sql: createTagsTable, name: 'Tags' },
        { sql: createRecipeTagsTable, name: 'RecipeTags' },
        { sql: createFavoritesTable, name: 'Favorites' },
        { sql: createRecipeReviewsTable, name: 'RecipeReviews' },
        { sql: createBlogReviewsTable, name: 'BlogReviews' },
        { sql: createIngredientsTable, name: 'Ingredients' },
        { sql: createRecipeIngredientsTable, name: 'RecipeIngredients' },
        { sql: createLikesTable, name: 'Likes' },
    ];

    tables.forEach(table => {
        db.run(table.sql, (err) => {
            if (err) {
                console.error(`Error creating table ${table.name}: ${err.message}`);
            } else {
                console.log(`Table ${table.name} created successfully.`);
            }
        });
    });
};


let db=new sqlite3.Database(dBname,(err)=>{
    if(err){
        console.error('Db Connection Error');
    }else{
        createTables();
        console.log("Db connected");
    }
})
module.exports=db