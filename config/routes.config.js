const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware')
const posts = require('../controllers/posts.controller')
const users = require('../controllers/users.controller')

router.route('/users')
    .post(users.create)
    
router.route('/login')
    .post(users.login)

router.route('/posts')
    .get(auth.checkAuth, posts.list)
    .post(auth.checkAuth, posts.create)

router.route('/posts/:id')
    .get(auth.checkAuth, posts.detail)
    .patch(auth.checkAuth, posts.update)
    .delete(auth.checkAuth, posts.delete)

module.exports = router;
