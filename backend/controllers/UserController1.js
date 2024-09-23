const db=require('../config/database')

const createUser=async (req,res)=>{
    const {uname,age}=req.body;
    const query='INSERT INTO users(name,age) VALUES (?,?)';
    db.run(query,[uname,age],(err)=>{
        if(err){
            console.error(err);
            res.status(500).send("DB Error");
        }else{
            res.status(200).send("User Created");
        }
    });
}

const getUsers=(req,res)=>{
    const query='SELECT * FROM users';
    db.all(query,[],(err,rows)=>{
        if(err){
            console.error(err);
            res.status(500).send("DB Error");
        }else{
            res.status(200).json(rows);
        }
    });
}

const getUserById=(req,res)=>{
    const {id}=req.params;
    const query='SELECT * FROM users WHERE id=?';
    db.all(query,[id],(err,rows)=>{
        if(err){
            console.error(err);
            res.status(500).send("DB Error");
        }else{
            res.status(200).json(rows);
        }
    });
}

const updateUser=(req,res)=>{
    const {id}=req.params;
    const {uname,age}=req.body;
    const query='UPDATE users SET name=?, age=? WHERE id=?';
    db.run(query,[uname,age,id],(err)=>{
        if(err){
            console.error(err);
            res.status(500).send("DB Error");
        }else{
            res.status(200).send("User Updated");
        }
    })
}

const deleteUser=(req,res)=>{
    const {id}=req.params;
    const query='DELETE FROM users WHERE id=?';
    db.run(query,[id],(err)=>{
        if(err){
            console.error(err);
            res.status(500).send("DB Error");
        }else{
            res.status(200).send("User Deleted");
        }
    });
}
module.exports={createUser,getUsers,getUserById,updateUser,deleteUser}