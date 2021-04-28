const express = require('express')
const app = express()
const weatherRoute = require('./routes/weather')
const newsRoute = require('./routes/news')
const authRoute = require('./routes/auth')
const logger = require('log4js').getLogger()
logger.level = "info"

app.use(express.json())
app.use('/api/news', newsRoute)
app.use('/api/weather', weatherRoute)
app.use('/auth', authRoute)

app.listen(2400, () => { logger.info("server started") })

module.exports = app
