import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthticateUserService from '@modules/users/services/AuthticateUserService';
import { classToClass } from 'class-transformer';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authUserService = container.resolve(AuthticateUserService);
    const { user, token } = await authUserService.execute({ email, password });

    return response.json({ user: classToClass(user), token });
  }
}
