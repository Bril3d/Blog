/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import AuthController from '#controllers/auth_controller';
import UsersController from '#controllers/users_controller';
import PostsController from '#controllers/posts_controller';



router.group(() => {
  router.post('/users', [UsersController, 'create'])
  router.get('/users', [UsersController, 'index'])
  router.get('/users/:id', [UsersController, 'show'])
  router.put('/users/:id', [UsersController, 'update'])
  router.delete('/users/:id', [UsersController, 'delete'])
}).middleware([middleware.auth])

router.group(() => {
  router.post('/posts', [PostsController, 'create'])
  router.get('/posts', [PostsController, 'index'])
  router.get('/posts/:id', [PostsController, 'show'])
  router.put('/posts/:id', [PostsController, 'update'])
  router.delete('/posts/:id', [PostsController, 'delete'])
}).middleware([middleware.auth])


router.get('/login', async ({ view }) => {
  return view.render('pages/auth/login');
});

router.post('/login', [AuthController, 'login']);

router.get('/register', async ({ view }) => {
  return view.render('pages/auth/register');
});

router.get('/', async ({ view }) => {
  return view.render('pages/home');
});

router.post('/register', [AuthController, 'register']);
