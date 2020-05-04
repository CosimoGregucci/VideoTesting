var Vote = require('../models/vote');
var Video = require('../models/video');
var async = require('async');
const validator = require('express-validator');
var count = 0; //il count va dimensionato sulla dimensione del vettore dei voti modificati
var mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
var auth = require('basic-auth');
// Display list of all Votes.
exports.vote_detail = function(req, res, next) {	
  var agg = [
    //ObjectId("5ea959b1e60bde3de8a18cb2")
		{$match : { video : ObjectId(req.params.id) }},
	{$group: {
      _id: "$version",
      total: {$avg: "$vote"}
    }}
  ];
	Vote.aggregate(agg, callback).sort('_id');
	function callback(err, docs){
    if(err) { /*errorHandler*/ };
	var i;
	var data=[];
	Object.values(docs).forEach(myfunc);
	function myfunc(items, indexs) {
		Object.values(items).forEach(myfunc2);
		}
	function myfunc2(item, index) {
		data.push(item);
	}
	output=[];
	kele=0;
	var index;
	data.forEach(myfunc3);
		function myfunc3(obj, i) {
		if((i%2)==0){
		index= obj;
		}
		else{
			output[kele]=[index,obj];
			kele=kele+1;
		}
		
	}
	
	async.series({
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
	res.render('vote_detail', { title: 'Vote Detail', db_data: output, videoName: results.video.name});	
});

  
    };
 };


// Display Vote create form on GET.
exports.vote_create_get = function(req, res) {
    res.render('vote_form', { title: 'Insert Vote' });
};

// Handle Vote create on POST.
exports.vote_create_post =  [
   
  // Validate that the name field is not empty.
  validator.body('vote', 'Vote required').isLength({ min: 1 }),
  

  // Process request after validation and sanitization.
  (req, res, next) => {

    // Extract the validation errors from a request.
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render('vote_form', { title: 'Insert Vote', errors: errors.array()});
      return;
    }
    else {
      // Data from form is valid.
      // Find video id
    async.series({
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
		
		    var vote = new Vote(
			{ 
			video:results.video,
			version: req.params.codVideo,
			vote: req.body.vote 
			}
			);
			vote.save(function (err) {
               if (err) { return next(err); }
               // Vote saved. Redirect to vote home page.
			   res.redirect('/');
			   
			   /*
			   if (count==1){
               res.render('video_detail', { title: 'Video Detail', video: results.video, videoA: results.video.locationBetter, videoB: results.video.locationWorse} ); //video A=8k; video B = 4k
			   }
			   else if(count==2){
				res.render('video_detail', { title: 'Video Detail', video: results.video, videoA: results.video.locationBetter, videoB: results.video.locationWorse} );  //video A=4k; video B = 4k
			   }
			   else{
				count=0;
				res.redirect('/');
			   }
			   */
             });
    });
    }
  }
];

exports.vote_list = function(req, res,next) {		
    Video.find({}, 'name description')
    .exec(function (err, list_videos) {
      if (err) { return next(err); }
      //Successful, so render
	  //azzera variabile
      res.render('vote_list', { title: 'Vote List', video_list: list_videos });
    });
};
