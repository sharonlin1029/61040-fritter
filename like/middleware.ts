import type { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import UserCollection from '../user/collection';
import LikeCollection from '../like/collection';

const alreadyLiking = async (request: Request, response: Response, next: NextFunction) => {
    if (await LikeCollection.isLiking(request.session.userId, request.params.freetId)) {
        response.status(406).json({
            error: {
                alreadyLikingPost: "You already like this post!"
            }
        });
        return;
    }
    next();
}

const notLiking = async (request: Request, response: Response, next: NextFunction) => {
    if (!(await LikeCollection.isLiking(request.session.userId, request.params.freetId))) {
        response.status(406).json({
            error: {
                notLikingPost: "You haven't liked this post yet!"
            }
        });
        return;
    }
    next();
}

export {
    alreadyLiking,
    notLiking
}