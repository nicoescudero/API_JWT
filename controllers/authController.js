const { Router } = require('express');
const router = Router();
const User = require('../models/user');

router.get('/', async (req, res, next) => {
    const usuario = await User.find();
    console.log(usuario);
    res.json({ message: 'get success' })
});
router.post('/signup', async (req, res, next) => {
    const { email, password } = req.body;
    const user = new User({
        email,
        password
    })

    user.password = await user.encryptPassword(user.password);
    await user.save();
    console.log(user);
    res.json({ message: 'User saved success' });
});
router.post('/signin', (req, res, next) => {
    res.send('This is signin');
});

module.exports = router;