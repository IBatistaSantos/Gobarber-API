import { Router } from 'express';
import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProfileControler from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileControler();

profileRouter.use(ensureAuthenticaded)

profileRouter.put('/', profileController.update)

profileRouter.get('/', profileController.show)


export default profileRouter;
