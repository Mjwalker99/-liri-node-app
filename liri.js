require("dotenv").config();

let keys = require("./keys.js")
let fs = require("fs");
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
let request = require("request");
var liriReturn = process.argv[2];

 switch (liriReturn) {  
  case "spotify-this-song":
        spotifyThisSong();
        break;

    // instructions for first-time user lurking around on the command line
    default: console.log("\n" + "type any command after 'node liri.js': " + "\n" +
        "spotify-this-song 'any song title' " + "\n");
};

//command 2 spotify this song
// need artist, song name, preview, album
function spotifyThisSong(trackName) {
    var trackName = process.argv[3];
    if (!trackName) {
        trackName = "I Want It That Way";
    };
    songRequest = trackName;
    spotify.search({
        type: "track",
        query: songRequest
    },
        function (err, data) {
            if (!err) {
                var trackInfo = data.tracks.items;
                for (var i = 0; i < 5; i++) {
                    if (trackInfo[i] != undefined) {
                        var spotifyResults =
                            "Artist: " + trackInfo[i].artists[0].name + "\n" +
                            "Song: " + trackInfo[i].name + "\n" +
                            "Preview URL: " + trackInfo[i].preview_url + "\n" +
                            "Album: " + trackInfo[i].album.name + "\n"

                        console.log(spotifyResults);
                        console.log(' ');
                    };
                };
            } else {
                console.log("error: " + err);
                return;
            };
        });
};


//command 4 do-what-it-says
// This block of code creates a file called "random.txt"
// It also adds the spotify command
function doWhatItSays() {

    fs.writeFile("random.txt", 'spotify-this-song,"I Want It That Way"', function (err) {
        var song = "spotify-this-song 'I Want It That Way'"
        // If the code experiences any errors it will log the error to the console.
        if (err) {
            return console.log(err);
        };

        // Otherwise, it will print:
        console.log(song);
    });
};