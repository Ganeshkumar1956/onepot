const express=require('express');
const {createUser,getUsers,AuthUser,getUserById,updateUser,deleteUser}=require('../controllers/UsersController');

const UserRouter=express.Router();

UserRouter.get('/', getUsers);

UserRouter.post('/login',AuthUser);

UserRouter.post('/', createUser);

UserRouter.get('/:user_id', getUserById);

UserRouter.put('/:user_id', updateUser);

UserRouter.delete('/:user_id', deleteUser);

module.exports = UserRouter;