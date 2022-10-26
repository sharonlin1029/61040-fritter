import type { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import UserCollection from '../user/collection';
import FollowCollection from '../follow/collection';

const alreadyFollowing = async (request: Request, response: Response, next: NextFunction) => {
    const userToFollow = await UserCollection.findOneByUsername(request.params.username);
    if (userToFollow) {
        if (await FollowCollection.isFollowing(request.session.userId, userToFollow.id)) {
            response.status(406).json({
                error: {
                    alreadyFollowingUser: `Already following user ${request.params.username}.`
                }
            });
            return;
        }
    }
    next();
}

const notFollowing = async (request: Request, response: Response, next: NextFunction) => {
    const userToFollow = await UserCollection.findOneByUsername(request.params.username);
    if (userToFollow) {
        if (!(await FollowCollection.isFollowing(request.session.userId, userToFollow.id))) {
            response.status(406).json({
                error: {
                    notFollowingUser: `Not following user ${request.params.username}.`
                }
            });
            return;
        }
    }
    next();
}

const userExists = async (request: Request, response: Response, next: NextFunction) => {
    console.log(request.params.username);
    const userSpecified = await UserCollection.findOneByUsername(request.params.username);
    if (userSpecified == null) {
        response.status(404).json({
            error: {
                userDoesNotExist: `User ${request.params.username} does not exist.`
            }
        });
        return;
    }
    next();
}

const notTheSameUser = async (request: Request, response: Response, next: NextFunction) => {
    const userSpecified = await UserCollection.findOneByUsername(request.params.username);
    if (userSpecified.id == request.session.userId) {
        response.status(406).json({
            error: {
                cantFollowAndUnfollowYourself: "You can't follow or unfollow yourself!"
            }
        });
        return;
    }
    next();
}

export {
    alreadyFollowing,
    notFollowing,
    userExists,
    notTheSameUser
};
