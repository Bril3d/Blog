import { HttpContext } from '@adonisjs/core/http';
import Post from '#models/post';

export default class PostsController {
  public async create({ request, response }: HttpContext) {
    const postData = request.only(['title', 'content', 'slug', 'user_id']);
    const post = await Post.create(postData);
    return response.created(post);
  }

  public async index({ response }: HttpContext) {
    const posts = await Post.query().preload('author');
    return response.ok(posts);
  }

  public async show({ params, response }: HttpContext) {
    const post = await Post.query().where('id', params.id).preload('author').first();
    if (!post) {
      return response.notFound('Post not found');
    }
    return response.ok(post);
  }

  public async update({ params, request, response }: HttpContext) {
    const post = await Post.find(params.id);
    if (!post) {
      return response.notFound('Post not found');
    }
    post.merge(request.only(['title', 'content', 'slug', 'user_id']));
    await post.save();
    return response.ok(post);
  }

  public async delete({ params, response }: HttpContext) {
    const post = await Post.find(params.id);
    if (!post) {
      return response.notFound('Post not found');
    }
    await post.delete();
    return response.noContent();
  }
}