const express=require('express');
const UserRoute=require("./routes/UserRoute");
const RecipeRoute=require("./routes/RecipeRoute");
const IngredientRoute=require("./routes/IngredientRoute");
const CuisineRoute=require("./routes/CuisineRoute");
const FavoriteRoute=require("./routes/FavoriteRoute");
const LikesRoute=require("./routes/LikesRoute");
const TagRoute=require("./routes/TagRoute");
const app=express()
const port=3000

app.use(express.json())

app.use("/user",UserRoute);
app.use("/recipe",RecipeRoute);
app.use("/cuisine",CuisineRoute);
app.use("/ingredient",IngredientRoute);
app.use("/favorite",FavoriteRoute);
app.use("/like",LikesRoute);
app.use("/tag",TagRoute);

app.listen(port,()=>{
    console.log("Server is listening on port 3000");
})