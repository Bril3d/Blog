import { HttpContext } from '@adonisjs/core/http';
import User from '#models/user';


export default class AuthController {
  public async login({ request, auth, response }: HttpContext) {
    /**
     * Step 1: Get credentials from the request body
     */
    const { email, password } = request.only(['email', 'password'])
    /**
     * Step 2: Verify credentials
     */
    const user = await User.verifyCredentials(email, password)
    console.log('user : ')
    console.log(user)
    /**
     * Step 3: Login user
     */
    await auth.use('web').login(user)

    /**
     * Step 4: Send them to a protected route
     */
    response.redirect('/')
  }

  public async register({ request, response }: HttpContext) {
    const userData = request.only(['fullName', 'email', 'password']);
    try {
      const user = await User.create(userData);

      return response.created(user);
    } catch (error) {
      return response.badRequest('User registration failed: ' + error.message);
    }
  }
}

