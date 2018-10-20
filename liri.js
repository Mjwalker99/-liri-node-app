require("dotenv").config();

let keys = require("./keys.js")
let fs = require("fs");
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
let request = require("request");
let moment = require("moment")
let liriReturn = process.argv[2];
let liriReturn2 = process.argv.slice(3);



switch (liriReturn) {
    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

    case "concert-this":
        concertThis();
        break;

    // instructions for first-time user lurking around on the command line
    default: console.log("\n" + "type any command after 'node liri.js': " + "\n" +
        "spotify-this-song 'any song title' "  + "\n" +
        "movie-this 'any movie title' " + "\n" +
        "do-what-it-says" + "\n" +
        "concert-this 'any artist' " + "\n")

};

//command 1 spotify this song
// need artist, song name, preview, album
function spotifyThisSong(trackName) {
    var trackName = process.argv[3];
    if (!trackName) {
        trackName = "The Sign Ace of Base";
    };
    songRequest = trackName;
    spotify.search({
        type: "track",
        query: songRequest
    },
        function (error, data) {
            if (!error) {
                var trackInfo = data.tracks.items;
                for (var i = 0; i < 5; i++) {
                    if (trackInfo[i] != undefined) {
                        var spotifyResults =
                            "Artist: " + trackInfo[i].artists[0].name + "\n" +
                            "Song: " + trackInfo[i].name + "\n" +
                            "Preview URL: " + trackInfo[i].preview_url + "\n" +
                            "Album: " + trackInfo[i].album.name + "\n" +
                            "-----------------------"

                        console.log(spotifyResults);
                        console.log(' ');
                    };
                };
            } else {
                console.log("error: " + error);
                return;
            };
        });
};

//command 2 movie this
// run a request to the OMDB API with the movie specified
function movieThis() {
 
 
    //using liriReturn2 from var list at top
    var queryUrl = "http://www.omdbapi.com/?t=" + liriReturn2 + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            //pull requested data in readable format
            var myMovieData = JSON.parse(body);
            var queryUrlResults =
                "Title: " + myMovieData.Title + "\n" +
                "Year: " + myMovieData.Year + "\n" +
                "IMDB Rating: " + myMovieData.Ratings[0].Value + "\n" +
                "Rotten Tomatoes Rating: " + myMovieData.Ratings[1].Value + "\n" +
                "Origin Country: " + myMovieData.Country + "\n" +
                "Language: " + myMovieData.Language + "\n" +
                "Plot: " + myMovieData.Plot + "\n" +
                "Actors: " + myMovieData.Actors + "\n"

            console.log(queryUrlResults);
        } else {
            console.log("error: " + error);
            return;
        };
    });
};


//command 3 do-what-it-says
// This block of code creates a file called "random.txt"
// It also adds the spotify command
function doWhatItSays() {

    fs.writeFile("random.txt", 'spotify-this-song,"The Sign Ace of Base" ', function (error) {
        var song =  "spotify-this-song 'The Sign Ace of Base'"
       
        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        };

        // Otherwise, it will print:
        console.log(song);
      
    });
};

//command 4 concert this
function concertThis() {

    //using liriReturn2 from var list at top
    var queryUrl = "https://rest.bandsintown.com/artists/" + liriReturn2 + "/events?app_id=279042a3fcff6518db5d989b05a8e5a0"

    console.log(queryUrl);
    request(queryUrl, function (error, response, body) {
        console.log(response.statusCode);
        // If the request is successful
        if (!error && response.statusCode === 200) {

            //pull requested data in readable format
            const Events = JSON.parse(body);
            var queryUrlResults =
                Events.forEach(event => console.log(`Venue: ${event.venue.name}` +"\n", `Country: ${event.venue.country}`+"\n", `Region: ${event.venue.region}`+"\n", `City: ${event.venue.city}`+"\n", `Date:  ${moment(event.datetime).format("MM/DD/YYYY")}` +"\n", "----------------------" ));
            
            
            
       

            console.log(queryUrlResults);
        } else {
            console.log("error:" + error);
            return;
        };
    });
};

