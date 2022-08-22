const thought_router = require('express').Router();
const { User, Thought } = require("../../models");

// find all thoughts 
thought_router.get('/thoughts', async(req, res) => {
    const thoughts = await Thought.find();

    res.send(thoughts)
});

// single thought by ID
thought_router.get('/thoughts', async(req, res) => {
    const singleThought = await Thought.findOne({ _id: user_id })

    res.send(singleThought)
});

// post new thought
// thought_router.post('/thoughts', async(req, res) => {
//     const newThought = await Thought.create(req.body)
// }) -- thinking on this need to come back 

// update thought by id

