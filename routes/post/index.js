const express = require('express');
const router = express.Router();
const postController = require('../../controllers/post/post.controller');

router.route('/').
    post(postController.createPost).
    get(postController.getPosts);

router.route('/:post_id').patch(postController.updatePost);

module.exports = router;