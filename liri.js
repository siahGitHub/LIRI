require("dotenv").config();
var keys = require("./keys");
const request = require('request');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var action = process.argv[2];
var userInput = process.argv.slice(3).join(' ');
const defaultSong = "The Sign";

switch (action) {
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        mySong(userInput);
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

function mySong(songname) {
    
    spotify.search({ type: 'track', query: songname }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (i=0; i < data.tracks.items.length; i++){
        
        console.log("Artist Name: "+data.tracks.items[i].album.artists[0].name);
        console.log("Track Name: "+data.tracks.items[i].name);
        console.log("Preview Url: "+data.tracks.items[i].preview_url);
        console.log("Album Name: "+data.tracks.items[i].album.name);
        console.log("++++++++++++++++Next Track+++++++++++++++++++++++++++++++++++")
       
        };
    });
};