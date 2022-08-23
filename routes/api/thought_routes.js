const thought_router = require('express').Router();
const { User, Thought } = require("../../models");

// find all thoughts 
thought_router.get('/', async(req, res) => {
    const thoughts = await Thought.find();

    res.send(thoughts)
});

// single thought by ID
thought_router.get('/', async(req, res) => {
    const singleThought = await Thought.findOne({ _id: user_id })

    res.send(singleThought)
});

// post new thought -- i dont think this is going to work
thought_router.post('/', async(req, res) => {
    const user = await User.findOne({ _id: req.body.user_id })
    console.log(user)
    const addThought = await Thought.create({
        thoughtText: req.body.thoughtText,
        username: user.username,
        userId: user._id
    });
    user.thoughts.push(addThought)
    user.save();
    res.json(user)
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







// {
//     Thought.create(req.body)
//     .then((newThought) => {
//         return User.findOneAndUpdate(
//             {_id: req.body.userId},
//             {$push: { thoughts: newThought._id }},
//             {
//             runValidators: true,
//             new: true
//         }).then(userAndThought => {
//             res.json(userAndThought)
//         })
//     })
// })