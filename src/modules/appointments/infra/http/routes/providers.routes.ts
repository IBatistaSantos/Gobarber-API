import { Router } from 'express';
import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ListProviderController from '../controllers/ListProviderController';

const providersRouter = Router();
providersRouter.use(ensureAuthenticaded);
const listProviderController = new ListProviderController();

providersRouter.get('/', listProviderController.index);

export default providersRouter;
