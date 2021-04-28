const express = require('express')
const app = express()
const weatherRoute = require('./routes/weather')
const newsRoute = require('./routes/news')
const authRoute = require('./routes/auth')

app.use(express.json())
app.use('/api/news', newsRoute)
app.use('/api/weather', weatherRoute)
app.use('/auth', authRoute)

app.listen(2400, () => { console.log('Server started: 2400') })

module.exports = app
