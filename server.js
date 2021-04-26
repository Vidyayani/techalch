const express = require('express')
const app = express()
const weatherRoute = require('./routes/weather')
const newsRoute = require('./routes/news')

app.use(express.json())
app.use('/news', newsRoute)
app.use('/weather', weatherRoute)

app.listen(2400, () => { console.log('Server started: 2400') })
