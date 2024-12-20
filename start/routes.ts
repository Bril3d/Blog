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
const AuthController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/users_controller')
const PostsController = () => import('#controllers/posts_controller')

router
  .group(() => {
    router.post('/users', [UsersController, 'create'])
    router.get('/users', [UsersController, 'index'])
    router.get('/users/:id', [UsersController, 'show'])
    router.put('/users/:id', [UsersController, 'update'])
    router.delete('/users/:id', [UsersController, 'delete'])
  })
  .use(middleware.auth())

router
  .group(() => {
    router.post('/posts', [PostsController, 'create'])
    router.get('/posts', [PostsController, 'index'])
    router.get('/posts/:id', [PostsController, 'show'])
    router.put('/posts/:id', [PostsController, 'update'])
    router.delete('/posts/:id', [PostsController, 'delete'])
  })
  .use(middleware.auth())

router
  .get('/login', async ({ view }) => {
    return view.render('pages/auth/login')
  })
  .use(middleware.guest())

router.post('/login', [AuthController, 'login']).use(middleware.guest())

router
  .get('/register', async ({ view }) => {
    return view.render('pages/auth/register')
  })
  .use(middleware.guest())

router.get('/', async ({ view }) => {
  return view.render('pages/home')
})

router.post('/register', [AuthController, 'register'])

router.post('logout', [AuthController, 'logout']).use(middleware.auth()).as('logout')

router
  .get('/dashboard', async ({ view }) => {
    return view.render('pages/dashboard/dashboard')
  })
  .use(middleware.auth()).as('dashboard')
router
  .get('/profile', async ({ view }) => {
    return view.render('pages/dashboard/profile')
  })
  .use(middleware.auth()).as('profile')
