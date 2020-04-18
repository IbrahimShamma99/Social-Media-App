import express from 'express';
import authCtrl from '../controllers/auth.controller';
import RouteNames from '../RouteNames';

const router = express.Router()

router.route(RouteNames.login)
  .post(authCtrl.signin)
router.route(RouteNames.logout)
  .get(authCtrl.signout)

export default router;