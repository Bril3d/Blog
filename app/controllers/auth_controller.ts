import { HttpContext } from '@adonisjs/core/http';
import User from '#models/user';

export default class AuthController {
  public async login({ request, response, auth }: HttpContext) {
    const { email, password } = request.all();
    try {
      await auth.use('web').attempt(email, password);
      return response.redirect('/');
    } catch {
      return response.badRequest('Invalid credentials');
    }
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

