import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import UserCollection from 'user/collection';
import FollowCollection from '../follow/collection';

// const alreadyFollowing = async (request: Request, response: Response, next: NextFunction) => {
//     if (request.session.userID) {
//         const user = await UserCollection.findOneByUserId(request.session.userID);
//         if (user.following.)
//     }
// }