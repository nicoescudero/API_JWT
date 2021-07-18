const { Router } = require('express');
const router = Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken');
require('dotenv').config();

router.get('/me', verifyToken, async (req, res, next) => {
    const user = await User.findById(req.userId);
    if (!user)
        return res.status(404).send('No user found');
    res.json(user);
});

router.post('/signup', async (req, res, next) => {
    const { email, password } = req.body;
    const user = new User({
        email,
        password
    })

    user.password = await user.encryptPassword(user.password);
    await user.save();
    console.log(process.env.KEY)
    console.log(user);
    const token = jwt.sign({ id: user._id }, process.env.KEY, {//dato que se guarda en el token "id"
        expiresIn: 60 * 60 * 24//expiracion del token "un dia"
    });
    res.json({ auth: true, token });
});

router.post('/signin', async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user)
        return res.status(401).send("The email entered is incorrect or does not exist")
    const validPassword = await user.validatePassword(password);
    if (!validPassword)
        return res.status(401).json({ auth: false, token: null });

    const token = await jwt.sign({ id: user._id }, process.env.KEY, {
        expiresIn: 60 * 60 * 24
    })
    res.json({ auth: true, token });


});

module.exports = router;