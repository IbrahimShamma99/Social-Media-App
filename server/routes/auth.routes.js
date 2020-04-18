import express from 'express';
import authCtrl from '../controllers/auth.controller';
import RouteNames from '../RouteNames';

const router = express.Router()

router.post(RouteNames.login,authCtrl.signin)
router.get(RouteNames.logout,authCtrl.signout)

export default router;