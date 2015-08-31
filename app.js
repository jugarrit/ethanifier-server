'use strict';

/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var request = require('request');
var SLACK_API_ENDPOINT = 'https://slack.com/api/';
var GET_PRESENCE = 'users.getPresence';
var USER_INFO = 'users.info';
var SLACK_USER_ID = process.env.SLACK_USER_ID;
var SLACK_AUTH_TOKEN = process.env.SLACK_AUTH_TOKEN;

/*
 * Routes
 */
app.get('/slackPresence', function(req, res) {
    request.post(SLACK_API_ENDPOINT + GET_PRESENCE, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.status(200).json(JSON.parse(body));
        }
    }).form({
        token: SLACK_AUTH_TOKEN,
        user: SLACK_USER_ID
    });
});

app.get('/slackUserInfo', function(req, res) {
    request.post(SLACK_API_ENDPOINT + USER_INFO, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.status(200).json(JSON.parse(body));
        }
    }).form({
        token: SLACK_AUTH_TOKEN,
        user: SLACK_USER_ID
    });
});


/*
 * Start it up
 */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);