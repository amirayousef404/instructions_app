// Call mongoose
const mogoose = require('mongoose')

// config to connect database
mogoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})