import express from 'express';
import userCtrl from '../controllers/user.controller';
import authCtrl from '../controllers/auth.controller';
import RouteNames from '../RouteNames';

const router = express.Router();

router.route(RouteNames.users)
  .get(userCtrl.list)
  .post(userCtrl.create);

router.route(RouteNames.userphoto)
  .get(userCtrl.photo, userCtrl.defaultPhoto);
router.route(RouteNames.defaultphoto)
  .get(userCtrl.defaultPhoto);

router.route(RouteNames.follow)
    .put(authCtrl.requireSignin, userCtrl.addFollowing, userCtrl.addFollower);
router.route(RouteNames.unfollow)
    .put(authCtrl.requireSignin, userCtrl.removeFollowing, userCtrl.removeFollower);

router.route(RouteNames.finduser)
   .get(authCtrl.requireSignin, userCtrl.findPeople);

router.route(RouteNames.user)
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

router.param('userId', userCtrl.userByID);

export default router;