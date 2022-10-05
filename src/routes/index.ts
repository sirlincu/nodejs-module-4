import { Router } from 'express';

import * as HomeController from '../controllers/homeController';
import * as InfoController from '../controllers/infoController';
import * as UserController from '../controllers/userController';

const router = Router();

router.get('/', HomeController.home);

router.post('/novo-usuario', UserController.addUserAction);
router.get('/users/:id/addAge', UserController.incrementAgeAction);
router.get('/users/:id/subAge', UserController.decrementAgeAction);
router.get('/users/:id/deleteUser', UserController.deleteUserAction);

router.get('/contato', InfoController.contato);
router.get('/sobre', InfoController.sobre);

router.get('/nome', UserController.nome);
router.get('/idade', UserController.idadeForm);
router.post('/idade-resultado', UserController.idadeAction);

export default router;