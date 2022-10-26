import { NextFunction, request, Request, Response, Router } from 'express';
import express from 'express';
import * as likeValidator from '../like/middleware';
import * as freetValidator from '../freet/middleware';
import * as userValidator from '../user/middleware';
import * as bookmarkValidator from './middleware';
import * as util from './util';
import BookmarkCollection from './collection';

const router = express.Router();

// bookmark freet
router.post(
    '/:freetId?/:category?',
    [
        userValidator.isUserLoggedIn,
        freetValidator.isFreetExists,
        bookmarkValidator.alreadyBookmarked,
    ],
   async (request: Request, response: Response) => {
        const user = (request.session.userId as string) ?? "";
        console.log(`Category is ${request.params.category}`);
        const bookmark = await BookmarkCollection.bookmarkFreet(user, request.params.freetId, request.params.category);
        response.status(201).json({
            message: `You have successfully saved this freet to the ${request.params.category} bookmark category!`,
            bookmark: util.constructBookmarkResponse(bookmark)
        })
   }
);

// unbookmark freet
router.delete(
    '/:freetId?',
    [
        userValidator.isUserLoggedIn,
        freetValidator.isFreetExists,
        bookmarkValidator.notBookmarkedYet
    ],
    async (request: Request, response: Response) => {
        const user = (request.session.userId as string) ?? "";
        const unbookmark = await BookmarkCollection.unbookmarkFreet(user, request.params.freetId);
        response.status(201).json({
            message: "You have successfully unbookmarked this freet!"
        });
    }
);

// change bookmark category
router.put(
    '/:freetId?/:category?',
    [
        userValidator.isUserLoggedIn,
        freetValidator.isFreetExists,
        bookmarkValidator.notBookmarkedYet
    ],
    async (request: Request, response: Response) => {
        const update = await BookmarkCollection.moveBookmarkToAnotherCategory(request.session.userId, request.params.freetId, request.params.category);
        response.status(200).json({
            message: `You have successfully moved your bookmark to the ${request.params.category} category!`,
            bookmark: util.constructBookmarkResponse(update)
        })
    }
)

router.get(
    '/',
    [
        userValidator.isUserLoggedIn
    ],
    // get all bookmarked freets
    async (request: Request, response: Response, next: NextFunction) => {
        if (request.query.category !== undefined) {
            next();
            return;
        }
        const allBookmarks = await BookmarkCollection.getAllBookmarks(request.session.userId);
        const ret = allBookmarks.map(util.constructBookmarkResponse);
        response.status(200).json(ret);
    },
    // get all bookmarked freets in a category
    [
        userValidator.isUserLoggedIn
    ],
    async (request: Request, response: Response) => {
        const categoryBookmarks = await BookmarkCollection.getBookmarksInCategory(request.session.userId, request.query.category as string);
        const ret = categoryBookmarks.map(util.constructBookmarkResponse);
        response.status(200).json(ret);
    }
);

router.get(
    '/categories/',
    [
        userValidator.isUserLoggedIn
    ],
    async (request: Request, response: Response, next: NextFunction) => {
        const categories = await BookmarkCollection.getAllBookmarkCategories(request.session.userId);
        response.status(200).json({
            bookmarks: categories
        });
    }
);

export {router as bookmarkRouter};