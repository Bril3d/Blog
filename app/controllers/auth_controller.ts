import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import app from '@adonisjs/core/services/app'
import { createUserValidator } from '#validators/user'

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
    /**
     * Step 3: Login user
     */
    await auth.use('web').login(user)

    /**
     * Step 4: Send them to a protected route
     */
    response.redirect('/')
  }

  public async register({ request, response, auth }: HttpContext) {
    const userData = request.only(['fullName', 'avatar', 'email', 'password'])

    await createUserValidator.validate(userData)
    const avatar = request.file('avatar')

    if (avatar) {
      await avatar.move(app.makePath('storage/avatars'))
      userData.avatar = `storage/avatars/${avatar.fileName}`
    }

    try {
      const user = await User.create(userData)

      await auth.use('web').login(user)

      return response.redirect('/')
    } catch (error) {
      return response.badRequest('User registration failed: ' + error.message)
    }
  }

  public async logout({ response, auth }: HttpContext) {
    await auth.use('web').logout()
    response.redirect().back()
  }
}
