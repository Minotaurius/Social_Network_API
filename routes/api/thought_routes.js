const thought_router = require('express').Router();
const { User, Thought, Reaction } = require("../../models");

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
                res.send(userAndThought)
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
    await Thought.findOneAndRemove({ _id: req.params.thoughtId })
    .then((deletedThought) => {
        return User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId }},
            { new: true}
        )
    }).then(() => {})

    res.json("Thought successfully deleted")
})

// add reaction to thought
thought_router.post('/:thoughtId/reactions', async(req, res) => {
    const addReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body }},
                { new: true }
            )
            addReaction.save()
            res.send(addReaction)
            // console.log(addReaction)
        })
    


// remove reaction from thought
thought_router.delete('/:thoughtId/reactions', async(req, res) => {
    await Thought.findOneAndRemove({ _id: req.params.thoughtId })
    .then((deletedThought) => {
        return User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId }},
            { new: true}
        )
    }).then(() => {})

    res.json("Thought successfully deleted")
})


module.exports = thought_router;






