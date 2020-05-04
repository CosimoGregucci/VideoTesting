#! /usr/bin/env node

console.log('This script populates some test videos and vote. Specified database as argument - e.g.: poplatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Vote = require('./models/vote')
var Video = require('./models/video')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var videos = []
var votes = []


function videoCreate(name, description, original, modified, cb) {
  videodetail = {
  name:name , 
  description: description,
  originalLocation: original,
  modifiedLocations: modified 
  }
 
  var video = new Video(videodetail);
       
  video.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Video: ' + video);
    videos.push(video)
    cb(null, video)
  }  );
}


function voteCreate(video,version, vote, cb) {
  votedetail = { 
    video: video,
	version: version,
    vote: vote,
  }

  var vote = new Vote(votedetail);    
  vote.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Vote: ' + vote);
    votes.push(vote)
    cb(null, vote)
  }  );
}




function createVideos(cb) {
    async.parallel([
        function(callback) {
          videoCreate('Boomerang', '360 degree viewable video', 'https://cloud.quavlive.com/s/9mMRQB6cQYE3ieN/download?path=%2FBoomerang&files=0_Boomerang_x264_23.mp4',['https://cloud.quavlive.com/s/9mMRQB6cQYE3ieN/download?path=%2FBoomerang&files=out_240_1280_3840_0_Boomerang_x264_23.mp4','https://cloud.quavlive.com/s/9mMRQB6cQYE3ieN/download?path=%2FBoomerang&files=out_480_1280_3840_0_Boomerang_x264_23.mp4','https://cloud.quavlive.com/s/9mMRQB6cQYE3ieN/download?path=%2FBoomerang&files=out_720_1280_3840_0_Boomerang_x264_23.mp4','https://cloud.quavlive.com/s/9mMRQB6cQYE3ieN/download?path=%2FBoomerang&files=out_1080_1280_3840_0_Boomerang_x264_23.mp4'], callback);
        },
		function(callback) {
          videoCreate('FighterJet', '360 degree viewable video', 'https://cloud.quavlive.com/s/9mMRQB6cQYE3ieN/download?path=%2FFighterJet&files=0_FighterJet_x264_23.mp4',['https://cloud.quavlive.com/s/9mMRQB6cQYE3ieN/download?path=%2FFighterJet&files=out_240_1280_3840_0_FighterJet_x264_23.mp4','https://cloud.quavlive.com/s/9mMRQB6cQYE3ieN/download?path=%2FFighterJet&files=out_480_1280_3840_0_FighterJet_x264_23.mp4','https://cloud.quavlive.com/s/9mMRQB6cQYE3ieN/download?path=%2FFighterJet&files=out_720_1280_3840_0_FighterJet_x264_23.mp4','https://cloud.quavlive.com/s/9mMRQB6cQYE3ieN/download?path=%2FFighterJet&files=out_1080_1280_3840_0_FighterJet_x264_23.mp4'],callback);
        },
		function(callback) {
          videoCreate('KITZ360', '360 degree viewable video', 'https://cloud.quavlive.com/s/9mMRQB6cQYE3ieN/download?path=%2FKITZ360&files=0_KITZ360_x264_23.mp4',['','https://cloud.quavlive.com/s/9mMRQB6cQYE3ieN/download?path=%2FKITZ360&files=out_480_1280_3840_0_KITZ360_x264_23.mp4','https://cloud.quavlive.com/s/9mMRQB6cQYE3ieN/download?path=%2FKITZ360&files=out_720_1280_3840_0_KITZ360_x264_23.mp4',''],callback);
        },
        function(callback) {
          videoCreate('Tahiti360', '360 degree viewable video', 'https://cloud.quavlive.com/s/9mMRQB6cQYE3ieN/download?path=%2FTahiti360&files=0_Tahiti360_x264_23.mp4',['https://cloud.quavlive.com/s/9mMRQB6cQYE3ieN/download?path=%2FTahiti360&files=out_240_1280_3840_0_Tahiti360_x264_23.mp4','https://cloud.quavlive.com/s/9mMRQB6cQYE3ieN/download?path=%2FTahiti360&files=out_480_1280_3840_0_Tahiti360_x264_23.mp4','https://cloud.quavlive.com/s/9mMRQB6cQYE3ieN/download?path=%2FTahiti360&files=out_720_1280_3840_0_Tahiti360_x264_23.mp4','https://cloud.quavlive.com/s/9mMRQB6cQYE3ieN/download?path=%2FTahiti360&files=out_1080_1280_3840_0_Tahiti360_x264_23.mp4'],callback);
        },

		function(callback) {
          videoCreate('UniversalStudiosFlorida', '360 degree viewable video', 'https://cloud.quavlive.com/s/9mMRQB6cQYE3ieN/download?path=%2FUniversalStudiosFlorida&files=0_UniversalStudiosFlorida_x264_23.mp4',['https://cloud.quavlive.com/s/9mMRQB6cQYE3ieN/download?path=%2FUniversalStudiosFlorida&files=out_240_1280_3840_0_UniversalStudiosFlorida_x264_23.mp4','https://cloud.quavlive.com/s/9mMRQB6cQYE3ieN/download?path=%2FUniversalStudiosFlorida&files=out_480_1280_3840_0_UniversalStudiosFlorida_x264_23.mp4','https://cloud.quavlive.com/s/9mMRQB6cQYE3ieN/download?path=%2FUniversalStudiosFlorida&files=out_720_1280_3840_0_UniversalStudiosFlorida_x264_23.mp4',''],callback);
        },
		function(callback) {
          videoCreate('WhiteLions', '360 degree viewable video', 'https://cloud.quavlive.com/s/9mMRQB6cQYE3ieN/download?path=%2FWhiteLions&files=0_WhiteLions_x264_23.mp4',['','https://cloud.quavlive.com/s/9mMRQB6cQYE3ieN/download?path=%2FWhiteLions&files=out_480_1280_3840_0_WhiteLions_x264_23.mp4','https://cloud.quavlive.com/s/9mMRQB6cQYE3ieN/download?path=%2FWhiteLions&files=out_720_1280_3840_0_WhiteLions_x264_23.mp4','https://cloud.quavlive.com/s/9mMRQB6cQYE3ieN/download?path=%2FWhiteLions&files=out_1080_1280_3840_0_WhiteLions_x264_23.mp4'],callback);
        },
		function(callback) {
          videoCreate('WildDolphins', '360 degree viewable video', 'https://cloud.quavlive.com/s/9mMRQB6cQYE3ieN/download?path=%2FWildDolphins&files=0_WildDolphins_x264_23.mp4',['https://cloud.quavlive.com/s/9mMRQB6cQYE3ieN/download?path=%2FWildDolphins&files=out_240_1280_3840_0_WildDolphins_x264_23.mp4','https://cloud.quavlive.com/s/9mMRQB6cQYE3ieN/download?path=%2FWildDolphins&files=out_480_1280_3840_0_WildDolphins_x264_23.mp4','https://cloud.quavlive.com/s/9mMRQB6cQYE3ieN/download?path=%2FWildDolphins&files=out_720_1280_3840_0_WildDolphins_x264_23.mp4',''],callback);
        },
        ],
        // optional callback
        cb);
}

/*
function createVotes(cb) {
    async.parallel([
        function(callback) {
          voteCreate(videos[0], 2, callback);
        },
		function(callback) {
          voteCreate(videos[0], -2, callback);
        },
		function(callback) {
          voteCreate(videos[1], 3, callback);
        },
		function(callback) {
          voteCreate(videos[1], 1, callback);
        },
        ],
        // optional callback
        cb);
}
*/
async.series([
    createVideos,
    //createVotes
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('VideoInstances: '+votes);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



