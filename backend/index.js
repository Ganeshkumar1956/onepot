const express=require('express');
const UserRoute=require("./routes/UserRoute");
const RecipeRoute=require("./routes/RecipeRoute");
const IngredientRoute=require("./routes/IngredientRoute");
const CuisineRoute=require("./routes/CuisineRoute");
const app=express()
const port=3000

app.use(express.json())

app.use("/user",UserRoute);
app.use("/recipe",RecipeRoute);
app.use("/cuisine",CuisineRoute);
app.use("/ingredient",IngredientRoute);

app.listen(port,()=>{
    console.log("Server is listening on port 3000");
})