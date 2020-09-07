const express = require('express');
const postController = require('../../controllers/post');
const post = require('../../models/post');

const router = express.Router();

router.get('/', postController.get_all_posts);

router.get('/:id', postController.get_post);

router.post('/', postController.create_post);

router.put('/:id', postController.update_post);

router.delete('/:id', postController.remove_post);

module.exports = router;
