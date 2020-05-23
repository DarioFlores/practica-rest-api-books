const { Router } = require('express');
const movie = require('./movie.router');
const user = require('./users.route');
const router = Router()


router.use('/api', movie)
router.use('/api', user)

module.exports = router;