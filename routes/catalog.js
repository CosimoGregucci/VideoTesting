var express = require('express');
var router = express.Router();

// Require controller modules.
var video_controller = require('../controllers/videoController');
var vote_controller = require('../controllers/voteController');

/// VIDEO ROUTES ///

// GET catalog home page.
router.get('/', video_controller.index);

// GET request for one video.
router.get('/video/:id', video_controller.video_detail);

// GET request for list of all video items.
router.get('/videos', video_controller.video_list);

/// VOTE ROUTES ///

// GET request for creating vote. NOTE This must come before route for id (i.e. display vote).
router.get('/:id/vote/create/:codVideo', vote_controller.vote_create_get);

// POST request for creating vote.
router.post('/:id/vote/create/:codVideo', vote_controller.vote_create_post);

// GET request for list of all votes.
router.get('/votes', vote_controller.vote_list);

// GET request for list of votes for a specific video.
router.get('/video/:id/votes', vote_controller.vote_detail);


module.exports = router;