const thought_router = require('express').Router();
const { User, Thought } = require("../../models");

// find all thoughts 
thought_router.get('/', async (req, res) => {
    const allThoughts = await Thought.find()

    res.json(allThoughts)
    // .then((thoughts) => {
    //     res.json(thoughts)
    // })
    // .catch((err) => {
    //     console.log(err);
    // })

});

// single thought by ID
thought_router.get('/:thoughtId', async(req, res) => {
    const singleThought = await Thought.findOne({ _id: req.params.thoughtId })

    res.send(singleThought)
});

// post new thought -- i dont think this is going to work
thought_router.post('/', async(req, res) => {
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
            .catch((err => {
                console.log(err)
            }))
        })
    })

// update thought by id
thought_router.put('/:thoughtId', async(req, res) => {
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
thought_router.delete('/:thoughtId', async(req, res) => {
    await Thought.find({ _id: req.params.thoughtId })

    console.log("Thought successfully deleted")
})

// reaction to thought



// remove reaction from thought

module.exports = thought_router;






