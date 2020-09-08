import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvailability from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityControler {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.body;

    const listProviderDayhAvailability = container.resolve(
      ListProviderDayAvailability,
    );

    const availabiliy = await listProviderDayhAvailability.execute({
      provider_id,
      month,
      year,
      day,
    });
    return response.json(availabiliy);
  }
}
