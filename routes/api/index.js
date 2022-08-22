const router = require('express').Router();
const thoughtRoutes = require('./thought_routes');
const userRoutes = require('./user_routes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;