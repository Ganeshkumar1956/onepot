const db=require('../config/database');


exports.countLikes = (req, res) => {
    const {recipe_id}=req.params;
    db.get(`SELECT COUNT(*) as count FROM Likes WHERE recipe_id=?`, [recipe_id], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({count:rows.count});
    });
};

exports.like=(req,res)=>{
    const {recipe_id}=req.params;
    const {user_id}=req.body;
    const query="INSERT INTO Likes(user_id,recipe_id) values (?,?)";
    db.run(query,[user_id,recipe_id],(err)=>{
        if(err){
            return res.status(500).json({ error: err.message });
        }else{
            return res.status(200).json("Recipe Liked");
        }
    })
}

exports.unlike=(req,res)=>{
    const {recipe_id}=req.params;
    const {user_id}=req.body;
    const query="DELETE FROM Likes WHERE user_id=? AND recipe_id=?";
    db.run(query,[user_id,recipe_id],(err)=>{
        if(err){
            return res.status(500).json({ error: err.message });
        }else{
            return res.status(200).json("Recipe Unliked");
        }
    })
}