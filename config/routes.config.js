const express = require('express');
const router = express.Router();
const posts = require('../controllers/posts.controller')

router.route('/posts')
    .get(posts.list)
    .post(posts.create)

router.route('/posts/:id')
    .get(posts.detail)
    .patch(posts.update)
    .delete(posts.delete)

module.exports = router;
