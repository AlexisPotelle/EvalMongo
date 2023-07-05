const User  = require('../models/userModel')

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.status(500).send(err);
    }
};

const createUser = async (req, res) => {
    try {
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password, 
        });

        user = await user.save();
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).send('The user with the given ID was not found.');
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId,
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }, { new: true });

        if (!user) return res.status(404).send('The user with the given ID was not found.');
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.userId);
        if (!user) return res.status(404).send('The user with the given ID was not found.');
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports= {getUsers,getUser,createUser,deleteUser, updateUser};