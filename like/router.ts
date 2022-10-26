import type { NextFunction, Request, Response } from 'express';
import express from 'express';
import * as likeValidator from '../like/middleware';
import * as freetValidator from '../freet/middleware';
import * as userValidator from '../user/middleware';
import * as util from './util';
import LikeCollection from './collection';
import UserCollection from '../user/collection';

const router = express.Router();

// like post
router.post(
    '/:freetId?',
    [
        userValidator.isUserLoggedIn,
        freetValidator.isFreetExists,
        likeValidator.alreadyLiking
    ],
    async (request: Request, response: Response) => {
        const user = (request.session.userId as string) ?? "";
        const like = await LikeCollection.likeFreet(user, request.params.freetId);
        response.status(201).json({
            message: "You have successfully liked this post!",
        });
    }
);


// unlike post
router.delete(
    '/:freetId?',
    [
        userValidator.isUserLoggedIn,
        freetValidator.isFreetExists,
        likeValidator.notLiking
    ],
    async (request: Request, response: Response) => {
        const user = (request.session.userId as string) ?? "";
        const unlike = await LikeCollection.unlikeFreet(user, request.params.freetId);
        response.status(201).json({
            message: "You have successfully unliked this post!"
        });
    }
);


// get all likes of a Freet

router.get(
    '/:freetId?',
    [
        userValidator.isUserLoggedIn,
        freetValidator.isFreetExists
    ],
    async (request: Request, response: Response) => {
        const likeList = await LikeCollection.getFreetLikes(request.params.freetId);
        const likes = likeList.map((like) => like.user);
        response.status(201).json({
            likes: likes.map(util.constructUserResponse)
        });
    }
)

export { router as likeRouter };