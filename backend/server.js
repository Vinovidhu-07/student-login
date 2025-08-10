const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const userschema =new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String
});
const usermodel = mongoose.model('try', userschema);
app.post('/', async (req, res) => {
    try {
        const { firstname, lastname, email} = req.body;
        const newUser = new usermodel({ firstname, lastname, email });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});
app.get('/', async (req, res) => {
    try {
        const users = await usermodel.find();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});
app.put('/:id', async (req, res) => {
    try {
        const { firstname, lastname, email } = req.body;
        const id = req.params.id;
        const updatedUser = await usermodel.findByIdAndUpdate(
            id,
            { firstname, lastname, email },
            { new: true }
        );
        res.json(updatedUser);
    }
     catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});
app.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await usermodel.findByIdAndDelete(id);
        res.json("todo deleted");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});
mongoose.connect('mongodb://localhost:27017/sample')
.then(() => {
    console.log("DB Connected");
})
.catch((error) => {
    console.log("error");
});
const port = 5000;
app.listen(port, () => {
    console.log("Server connected");
});
