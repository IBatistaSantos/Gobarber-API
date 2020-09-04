import AppError from '../../../shared/errors/AppError';

import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointsmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(()=> {
     fakeAppointmentRepository = new FakeAppointmentRepository();
     createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
    );
  });

  it('should be able to create new appointment', async () => {

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: 'user',
      provider_id: 'provider_id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toHaveProperty('provider_id');
  });

  it('should not be able to create new appointment on same time', async () => {
    const appointmentDate = new Date(2020, 8, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'user',
      provider_id: 'provider_id',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: 'user',
        provider_id: 'provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointments on past date', async () =>{
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 10),
        provider_id: 'provider_id',
        user_id: 'user_id'
      })
    ).rejects.toBeInstanceOf(AppError)

  });
});
