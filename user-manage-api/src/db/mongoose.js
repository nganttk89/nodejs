const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/user-manager-api', {useNewUrlParser: true, useCreateIndex: true});