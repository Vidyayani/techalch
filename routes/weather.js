const request = require('request')
const express = require('express')
const router = express.Router()
const logger = require('log4js').getLogger()


const options = {
  method: 'GET',
  url: 'https://community-open-weather-map.p.rapidapi.com/forecast',
  qs: { q: 'bangalore,IND' },
  headers: {
    'x-rapidapi-key': '2efe6ff787msh76884ac9c5de4a0p1e000cjsn419a382c680c',
    'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
    useQueryString: true
  }
}


router.get('', (req,res) => {

    request(options, function (error, response, body) {
        if (error) throw new Error(error)
        if(response.statusCode == '200'){

        body = JSON.parse(body)
        var array = body.list.filter(element => {return element.dt_txt.includes("09:00:00")});
        var data_arr = []
        var jsonresponse = { count : array.length,  unit : "metric", location: body.city.name}
        array.forEach((element) => {

            var json = {};
            json.date = (new Date(element.dt_txt)).toDateString()
            json.main = element.weather[0].description
            json.temp = element.main.temp
            data_arr.push(json)
        });
        jsonresponse.data = data_arr;
        res.status(200).json(jsonresponse)
        }else
        res.status(response.statusCode).json(response.statusMessage)
        logger.info("Fetched response from open weather API", jsonresponse)
      })

})

module.exports = router

