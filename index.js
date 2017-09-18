'use strict';
let cheerio = require('cheerio');
let request = require('request');

exports.getCalories = function(event, context, callback) {
    let url = process.env["CALORIES_URL"];

    request(url, function(err, response, body) {
        if(err) callback(null, err);
        if(response.statusCode !== 200) {
            callback(null, 'Invalid status code: '+response.statusCode);
        }
        let $ = cheerio.load(body);

        let calorieGoal = $('.total.alt td:nth-child(2)').html()
        let caloriesRemaining = $('.total.remaining td:nth-child(2)').html();

        callback(null, caloriesRemaining + " " + calorieGoal);
    });
};
