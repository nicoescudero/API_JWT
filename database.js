const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/testJwt', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Database is connected'));