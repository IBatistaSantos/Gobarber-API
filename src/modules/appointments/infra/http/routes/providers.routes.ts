import { Router } from 'express';
import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ListProviderController from '../controllers/ListProviderController';
import ProviderMonthAvailabilityControler from '../controllers/ProviderMonthAvailabilityControler';
import ProviderDayAvailabilityControler from '../controllers/ProviderDayAvailabilityControler';

const providersRouter = Router();
providersRouter.use(ensureAuthenticaded);
const listProviderController = new ListProviderController();
const providerMonthAvailabilityControler = new ProviderMonthAvailabilityControler();
const providerDayAvailabilityControler = new ProviderDayAvailabilityControler();

providersRouter.get('/', listProviderController.index);
providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityControler.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityControler.index,
);
export default providersRouter;
