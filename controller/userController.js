const bcrypt = require("bcryptjs");
const { User } = require("../models");

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const addUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!password) {
            return res.status(400).json({ error: "User must provide a password" });
        }

        const user = await User.create({ name, email, password });

        return res.status(201).json(user);


    } catch (error) {
        res.status(500).json({ error: error.message, error_2: error })
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            user.password = await bcrypt.hash(password, 10); 
        }

        await user.save();
        return res.status(200).json({ message: "User found", user })
    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}

module.exports = { getUsers, addUser, updateUser }