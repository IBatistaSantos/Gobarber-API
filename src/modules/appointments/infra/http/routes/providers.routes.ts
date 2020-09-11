import { Router } from 'express';
import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';
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
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerMonthAvailabilityControler.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerDayAvailabilityControler.index,
);
export default providersRouter;
