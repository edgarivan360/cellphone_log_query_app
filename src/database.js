const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(db => console.log(process.env.MONGODB_SUCCESS_CONNECTION_MSG))
.catch(err => console.log(err));