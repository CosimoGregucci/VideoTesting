var Video = require('../models/video');
var Vote = require('../models/vote');
var async = require('async');
//var video già votati
exports.index = function(req, res) {   
    
    async.parallel({
        video_count: function(callback) {
            Video.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        vote_count: function(callback) {
            Vote.countDocuments({}, callback);
        }
    }, function(err, results) {
        res.render('index', { title: 'Video Testing Home', error: err, data: results });
    });
};

// Display list of all Videos.
exports.video_list = function(req, res, next) {

  Video.find({}, 'name description')
    .exec(function (err, list_videos) {
      if (err) { return next(err); }
      //Successful, so render
	  //azzera variabile
      res.render('video_list', { title: 'Video List', video_list: list_videos });
    });
    
};

// Display detail page for a specific Video.
exports.video_detail = function(req, res, next) {

    async.parallel({
        video: function(callback) {
            Video.findById(req.params.id)
              .exec(callback);
        },

    }, function(err, results) {
        if (err) { return next(err); }
        if (results.video==null) { // No results.
            var err = new Error('Video not found');
            err.status = 404;
            return next(err);
        }
		var modified = results.video.modifiedLocations;
		//var index = Math.floor(Math.random() * modified.length);
		var index;
		do {
		index = Math.floor(Math.random() * modified.length);
		}while (modified[index]=='');
        // Successful, so render
		//original video/ un video a caso degli ottimizzati
		//metti l'indice del video nella variabile globale così la prox volta non lo riprendi
		//ti passo l'indice del video così ti ricordi che il voto è relativo a quello
        res.render('video_detail', { title: 'Video Detail', video: results.video, videoA: results.video.originalLocation, videoB: modified[index], codVideo: index} ); //video A=4k; video B = 8k
    });

};
