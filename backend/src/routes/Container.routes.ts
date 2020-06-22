import { Router } from 'express';
import containerController from '../controllers/Container.controller';
import passport from 'passport';
import { userMiddleware } from '../middlewares/User.middleware';

const router = Router();

/**
 * Add routes
 * Get
 * Modify
 * Delete
 * **FOR CREATION SHOULD ALWAYS BE ONE AND ONLY ONE USER PER CONTAINER AND VICEVERSA,RECALL CONTAINER CONSTRUCTOR
 * 
 */
router.get('/reconsider/',passport.authenticate('jwt', { session: false }), userMiddleware.verifyAdminRole,(req,res,next) =>  containerController.reconsider(req,res))
router.get('/get/:user_id', passport.authenticate('jwt', { session: false }), containerController.getContainer)
router.put('/modify/:id', passport.authenticate('jwt', { session: false }), userMiddleware.verifyAdminRole, containerController.updateContainer)
router.delete('/del/:id', passport.authenticate('jwt', { session: false }), userMiddleware.verifyAdminRole, containerController.deleteContainer)


export default router;