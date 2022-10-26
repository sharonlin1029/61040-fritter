import type { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import BookmarkCollection from './collection';

// check if freet is saved yet
const alreadyBookmarked = async (request: Request, response: Response, next: NextFunction) => {
    if (await BookmarkCollection.alreadyBookmarked(request.session.userId, request.params.freetId)) {
        response.status(406).json({
            error: {
                postAlreadyBookmarked: "This post is already bookmarked!"
            }
        });
        return;
    }
    next();
}

// check if bookmark is in the collection already
const notBookmarkedYet = async (request: Request, response: Response, next: NextFunction) => {
    if (!(await BookmarkCollection.alreadyBookmarked(request.session.userId, request.params.freetId))) {
        response.status(406).json({
            error: {
                postNotBookmarkedYet: "This post hasn't been bookmarked yet!"
            }
        });
        return;
    }
    next();
}

export{
    alreadyBookmarked,
    notBookmarkedYet,
}
