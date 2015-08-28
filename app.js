'use strict';

/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var port = 3000;
var request = require('request');
var SLACK_API_ENDPOINT = 'https://slack.com/api/';
var GET_PRESENCE = 'users.getPresence';
var USER_INFO = 'users.info';

// For gzip compression
app.use(express.compress());

/*
 * Routes
 */
app.get('/slackPresence', function(req, res) {
    request.post(SLACK_API_ENDPOINT + GET_PRESENCE, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.status(200).json(body);
        }
    }).form({
        token: process.env.SLACK_AUTH_TOKEN,
        user: process.env.SLACK_USER_ID
    });
});

app.get('/slackUserInfo', function(req, res) {
    request.post(SLACK_API_ENDPOINT + USER_INFO, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.status(200).json(body);
        }
    }).form({
        token: process.env.SLACK_AUTH_TOKEN,
        user: process.env.SLACK_USER_ID
    });
});


/*
 * Start it up
 */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);