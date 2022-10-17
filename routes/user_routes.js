const { Router } = require('express')
const User = require('../models/User.js')
const router = Router();


router.post('/create', async (req, res) => {
    const user = new User({
      login: req.body.login,
      password: req.body.password
    })

    await user.save()

});

module.exports = router