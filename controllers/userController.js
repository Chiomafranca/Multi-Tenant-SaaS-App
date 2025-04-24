const User = require('../models/User')


//create User
const createUser = async () =>{
   
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).json({message: "User created", user})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}

//get one user
const getUserById = () =>{
       
    try {
        const user = User.findById(req.params.id).populate('tenant');
        if(!user) return res.status(404).json({message: "User not found"});

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message})
    }
}

//getUsers
const getUsers = async () =>{

    try {
        const users = await User.find().populate('tenant');
        res.status(200).json(users)

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

//updateUser
const updateUser = async () =>{
    try {
        const { email, role, tenant } = req.body;
        
        const user = await User.findByIdAndUpdate(req.params.id, {email, role, tenant}, {new: true})
        if(!user) return res.status(404).json({message: "User updated successfully", user})
    } catch (error) {
        res.status(500).json({message: 'Server Error', error: error.message})
    }
}

// Delete User
const deleteUser = async () =>{

    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) return res.status(404).json({message: "User User not found"});

        res.status(200).json({message: 'User deleted successfully'})
    } catch (error) {
         res.status(500).json({message: "Server Error", error: error.message})
    }
}
module.exports = {createUser, getUserById, getUsers, updateUser, deleteUser}