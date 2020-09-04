import { Router } from 'express';
import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentController from '../controllers/AppointmentController';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticaded);
const appointmentController = new AppointmentController();

appointmentsRouter.post('/', appointmentController.create);

export default appointmentsRouter;
