const request = require('request')
const express = require('express')
const router = express.Router()
const middleware = require('../middlewares')

router.get('', middleware.verify, (req, res) => {
    if(!req.query.search)
    var options = {
        method: 'GET',
        url: 'https://newsapi.org/v2/top-headlines',
        qs: {
            country: "in",
            apiKey: "9edc3bd2eaee4219b7438d3a554945d1"
        }
    }
else
    var options = {
        method: 'GET',
        url: 'https://newsapi.org/v2/everything',
        qs: {
            q: req.query.search,
            from: (new Date()).toISOString().split('T')[0],
            sortBy: "popularity",
            apiKey: "9edc3bd2eaee4219b7438d3a554945d1"
        }
    }

    request(options, function (error, response, body) {
        if (error) throw new Error(error)
        if (response.statusCode == '200') {
            body = JSON.parse(body)
            
            var data_size = body.totalResults > 20 ? 20 : body.totalResults;
            var data_arr = body.articles.slice(0, data_size)
            var jsonresponse = { count: data_size, data: [] }
            data_arr.forEach((element, i) => {

                var json = {
                    headline: element.title,
                    link: element.url
                }
                jsonresponse.data.push(json)

            });
            res.status(200).json(jsonresponse)
            console.log(data_arr.length)


        }else
            res.status(response.statusCode).json(response.statusMessage)
    });

});


module.exports = router