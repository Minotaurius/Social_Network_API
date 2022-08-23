const user_router = require('express').Router();
const { User, Thought } = require("../../models");

//find all users
user_router.get('/', async(req, res) => {
    const users = await User.find();

    res.send(users)
});

// find a user by id & populate thought/friend data
user_router.get('/:userId', async(req, res) => {
    const user_id = req.params.userId
    const user = await User.findOne({ _id: user_id }).populate('friends').populate('thoughts')
    
    res.send(user)
});

// adds a new user
user_router.post('/', async(req, res) => {
    const newUser = await User.create(req.body)

    res.send(newUser)
});

// updates a user by id
user_router.put('/:userId', async(req, res) => {
    const updateUser = await User.findOneAndUpdate({
        _id: req.params.userId
    }, {
        $set: req.body
    }, {
        runValidators: true,
        new: true
    })

    res.send(updateUser)
});

// delete a user by ID - is deleting but request just spins
user_router.delete('/:userId', async(req, res) => {
    const deletedUser = await User.deleteOne({
        _id: req.params.userId
    })

    res.send("User has been removed from the database")
});

// adds a friend by ID? --- not working
user_router.post('/:userId/friends/:friendId', async(req, res) => {
    const addFriend = await User.findOneAndUpdate({
        _id: req.params.userId
    }, {
        $addToSet: { friends: req.params.friendId }
    }, {
        new: true
    })

    res.send(addFriend)
})


// delets user from friends list -- not working
user_router.delete('/:userId/friends/:friendId', async(req, res) => {
    const deleteFriend = await User.findOneAndUpdate({
        _id: req.params.userId
    }, {
        $pull: { friends: req.params.friendId }
    }, {
        new: true
    })

    res.send(deleteFriend)
})

module.exports = user_router;