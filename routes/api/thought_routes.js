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

// post new thought -- i dont think this is going to work
thought_router.post('/thoughts', (req, res) => {
    Thought.create(req.body)
    .then((newThought) => {
        return User.findOneAndUpdate(
            {_id: req.body.userId},
            {$push: { thoughts: newThought._id }},
            {
            runValidators: true,
            new: true
        }).then(userAndThought => {
            res.json(userAndThought)
        })
    })
})

// update thought by id
thought_router.put('/thoughts/:thoughtId', async(req, res) => {
    const updateThought = await Thought.findOneAndUpdate({
        _id: req.params.thoughtId
    }, {
        $set: req.body
    }, {
        runValidators: true,
        new: true
    })

    res.send(updateThought)
});

// delete a thought
thought_router.delete('/thoughts/:thoughtId', async(req, res) => {
    await Thought.find({ _id: req.params.thoughtId })

    console.log("Thought successfully deleted")
})

// reaction to thought



// remove reaction from thought