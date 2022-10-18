import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import FollowCollection from './collection';
import * as userValidator from '../user/middleware';
import * as followValidator from '../follow/middleware';
import * as util from './util';
import UserCollection from 'user/collection';

const router = express.Router();


// follow someone
router.post(
    '/',
    [
      userValidator.isUserLoggedIn,
    ],
    async (request: Request, response: Response) => {
        const user = (request.session.userId as string) ?? "";
        const userToFollow = await UserCollection.findOneByUsername(request.body.user);
        const following = await FollowCollection.followUser(user, userToFollow.id);
        response.status(201).json({
            message: "You successfully followed this user!",
            follow: util.constructFollowResponse(following)
        });
    }
);

// unfollow someone
// router.delete(
//     '/',
//     [
//       userValidator.isUserLoggedIn,
//     ],
//     async (request: Request, response: Response) => {
//         const user = (request.session.userId as string) ?? "";
//         const userToFollow = await UserCollection.findOneByUsername(request.body.user);
//         const following = await FollowCollection.unfollowUser(user, userToFollow.id);
//         response.status(201).json({
//             message: "You successfully unfollowed this user!",
//             follow: util.constructFollowResponse(following)
//         });
//     }
// )


// get followers
router.get(
    '/',
    [
      userValidator.isUserLoggedIn,
    ],
    async (request: Request, response: Response) => {
        const followers = await FollowCollection.getFollowerList((request.session.userID as string) ?? "");
        response.status(201).json({
            followers: followers.map(util.constructFollowResponse)
        });
    }
);


// get following
router.get(
    '/',
    [
      userValidator.isUserLoggedIn,
    ],
    async (request: Request, response: Response) => {
        const followers = await FollowCollection.getFollowingList((request.session.userID as string) ?? "");
        response.status(201).json({
            followers: followers.map(util.constructFollowResponse)
        });
    }
);