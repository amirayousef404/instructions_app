// To used express
const app = require('./src/app')

// Store port information
const port = process.env.PORT || 3000

// Listen port
app.listen(port)