require("dotenv").config();
var keys = require("./keys");
const request = require('request');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var action = process.argv[2];
var defaultSong = "The Sign";

switch (action) {
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        spotify(songName);
        break;
    case "movie-this":
        movie(movieName);
        break;
    case "do-what-it-says":
        doIt();
        break;
    default:
        console.log("Action is not defined");
};

function myTweets() {


    var params = { screen_name: 'dwaynemhinds' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            //console.log(tweets);
            if (tweets.length < 20) {
                numOfTweets = tweets.length;
            }
            else {
                numOfTweets = 20;
            }
            for (i = 0; i < numOfTweets; i++) {
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);

            };
        };
    });
};