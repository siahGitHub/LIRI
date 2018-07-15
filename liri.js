require("dotenv").config();
var keys = require("./keys");
const request = require('request');
const fs = require('fs');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var action = process.argv[2];
var userInput = process.argv.slice(3).join(' ');
const defaultSong = "The Sign";
const defaultMovie = "Mr. Nobody"
const FILE_NAME = 'random.txt';



//Conditional check to see which api to call
switch (action) {
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        //check if user has provided data else set song to default
        if (!userInput) {
            userInput = defaultSong;
        };
        mySong(userInput);
        break;
    case "movie-this":
        //check if user has provided data else set song to default
        if (!userInput) {
            userInput = defaultMovie;
        };
        myMovie(userInput);
        break;
    case "do-what-it-says":
        doIt();
        break;
    default:
        console.log("Action is not defined");
};

//Function that calls twitter api to return 20 latest tweets
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

//Function that calls spotify api to search info about song provided by user
function mySong(songname) {

    spotify.search({ type: 'track', query: songname }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (i = 0; i < data.tracks.items.length; i++) {

            console.log("Artist Name: " + data.tracks.items[i].album.artists[0].name);
            console.log("Track Name: " + data.tracks.items[i].name);
            console.log("Preview Url: " + data.tracks.items[i].preview_url);
            console.log("Album Name: " + data.tracks.items[i].album.name);
            console.log("++++++++++++++++Next Track+++++++++++++++++++++++++++++++++++")

        };
    });
};

//Function that calls imdb api to search info about the movie provided by user
function myMovie(moviename) {

    var queryUrl = "http://www.omdbapi.com/?t=" + moviename + "&y=&plot=short&apikey=trilogy";
    // Then create a request to the queryUrl
    // Set the options on the request before call the request method
    const options = {
        url: queryUrl,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8'
        }
    };

    request(options, function (err, res, body) {
        // If the request is successful
        if (!err && res.statusCode === 200) {
            let json = JSON.parse(body);
            console.log("Title of the movie: " + json.Title);
            console.log("Year the movie came out: " + json.Year);
            console.log("IMDB Rating of the movie: " + json.imdbRating);
            for (i = 0; i < json.Ratings.length; i++) {
                if (json.Ratings[i].Source === "Rotten Tomatoes") {
                    console.log("Rotten Tomatoes Rating of the movie: " + json.Ratings[i].Value);
                }
            };
            console.log("Country where the movie was produced: " + json.imdbRating);
            console.log("Language of the movie: " + json.Language);
            console.log("Plot of the movie: " + json.Plot);
            console.log("Actors in the movie: " + json.Actors);
        };
    });
};

function doIt() {
    fs.readFile(FILE_NAME, "utf8", function (err, data) {
        if (err) {
            console.log(err.message);
        }
        else {
            //console.log(data);

            arr = data.split(",");

            switch (arr[0]) {
                case "spotify-this-song":
                    //check if user has provided data else set song to default
                    if (!arr[1]) {
                        arr[1] = defaultSong;
                    };
                    mySong(arr[1]);
                    break;
                case "movie-this":
                    //check if user has provided data else set song to default
                    if (!arr[1]) {
                        arr[1] = defaultMovie;
                    };
                    myMovie(arr[1]);
                    break;
                case "do-what-it-says":
                    doIt();
                    break;
                default:
                    console.log("Action in file not supported");
            };

        };
    });
};