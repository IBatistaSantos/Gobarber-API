import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAppointsmentService from '@modules/appointments/services/CreateAppointsmentService';

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const createAppointsment = container.resolve(CreateAppointsmentService);

    const appointment = await createAppointsment.execute({
      provider_id,
      user_id,
      date,
    });
    return response.json(appointment);
  }
}
