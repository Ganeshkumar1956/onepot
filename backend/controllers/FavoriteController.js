const db=require('../config/database');


exports.getFavorite = (req, res) => {
    const {user_id}=req.body;
    db.all(`SELECT recipe_id FROM Favorites WHERE user_id=?`, [user_id], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json(rows);
    });
};

exports.addFavorite=(req,res)=>{
    const {user_id,recipe_id}=req.body;
    const query="INSERT INTO Favorites(user_id,recipe_id) values (?,?)";
    db.run(query,[user_id,recipe_id],(err)=>{
        if(err){
            return res.status(500).json({ error: err.message });
        }else{
            return res.status(200).json("Favorite Added");
        }
    })
}

exports.removeFavorite=(req,res)=>{
    const {user_id,recipe_id}=req.body;
    const query="DELETE FROM Favorites WHERE user_id=? AND recipe_id=?";
    db.run(query,[user_id,recipe_id],(err)=>{
        if(err){
            return res.status(500).json({ error: err.message });
        }else{
            return res.status(200).json("Favorite Removed");
        }
    })
}