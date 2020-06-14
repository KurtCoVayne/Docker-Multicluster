import { Router } from 'express';
import passport from 'passport';

import { userController } from '../controllers/User.controllers';
import { userMiddleware } from '../middlewares/User.middleware';

const router=Router();

router.post('/signin', userController.signin );

router.post('/signup', userController.signup );

router.put('/changepass', passport.authenticate('jwt', {session:false}) ,userController.changePass );

export default router;