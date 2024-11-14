import { HttpContext } from '@adonisjs/core/http';
import User from '#models/user';

export default class UsersController {
  public async create({ request, response }: HttpContext) {
    const userData = request.only(['fullName', 'email', 'password']);
    const user = await User.create(userData);
    return response.created(user);
  }

  public async index({ response }: HttpContext) {
    const users = await User.all();
    return response.ok(users);
  }

  public async show({ params, response }: HttpContext) {
    const user = await User.find(params.id);
    if (!user) {
      return response.notFound('User not found');
    }
    return response.ok(user);
  }

  public async update({ params, request, response }: HttpContext) {
    const user = await User.find(params.id);
    if (!user) {
      return response.notFound('User not found');
    }
    user.merge(request.only(['fullName', 'email', 'password']));
    await user.save();
    return response.ok(user);
  }

  public async delete({ params, response }: HttpContext) {
    const user = await User.find(params.id);
    if (!user) {
      return response.notFound('User not found');
    }
    await user.delete();
    return response.noContent();
  }
}