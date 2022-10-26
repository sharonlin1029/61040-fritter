import type { NextFunction, Request, Response } from 'express';
import express from 'express';
import FollowCollection from './collection';
import * as userValidator from '../user/middleware';
import * as followValidator from '../follow/middleware';
import * as util from './util';
import UserCollection from '../user/collection';

const router = express.Router();


// follow someone
router.post(
    '/:username?',
    [
        userValidator.isUserLoggedIn,
        followValidator.userExists,
        followValidator.notTheSameUser,
        followValidator.alreadyFollowing,
    ],
    async (request: Request, response: Response) => {
        const follower = (request.session.userId as string) ?? "";
        const following = await UserCollection.findOneByUsername(request.params.username);
        const follow = await FollowCollection.followUser(follower, following.id);
        response.status(201).json({
            message: "You successfully followed this user!",
        });
    }
);

// unfollow someone
router.delete(
    '/:username?',
    [
        userValidator.isUserLoggedIn,
        followValidator.userExists,
        followValidator.notTheSameUser,
        followValidator.notFollowing
    ],
    async (request: Request, response: Response) => {
        const follower = (request.session.userId as string) ?? "";
        const following = await UserCollection.findOneByUsername(request.params.username);
        const unfollow = await FollowCollection.unfollowUser(follower, following.id);
        response.status(201).json({
            message: "You successfully unfollowed this user!"
        });
    }
);



// get followers
router.get(
    '/followers/',
    [
        userValidator.isUserLoggedIn,
    ],
    async (request: Request, response: Response) => {
        const followList = await FollowCollection.getFollowerList((request.session.userId as string) ?? "");
        const followers = followList.map((follow) => follow.follower);
        response.status(201).json({
            user: util.constructUserResponse(await UserCollection.findOneByUserId(request.session.userId)),
            followers: followers.map(util.constructUserResponse)
        });
    }
);


// get following
router.get(
    '/following/',
    [
        userValidator.isUserLoggedIn,
    ],
    async (request: Request, response: Response) => {
        const followList = await FollowCollection.getFollowingList((request.session.userId as string) ?? "");
        const followings = followList.map((follow) => follow.following);
        response.status(201).json({
            user: util.constructUserResponse(await UserCollection.findOneByUserId(request.session.userId)),
            following: followings.map(util.constructUserResponse)
        });
    }
);

router.get(
    '/feed/',
    [
        userValidator.isUserLoggedIn,
    ],
    async (request: Request, response: Response) => {
        const feed = await FollowCollection.getUsersFeed(request.session.userId, request.query.filter.toString());
        response.status(201).json({
            feed: feed.map(util.constructFreetResponse)
        });
    }
)

export { router as followRouter };
