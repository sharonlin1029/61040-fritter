import type { HydratedDocument, Types } from 'mongoose';
import type { Follow } from '../follow/model';
import { constructUserResponse } from '../user/util';
import { constructFreetResponse } from '../freet/util';

type FollowResponse = {
    follower: string;
    following: string;
};

const constructFollowResponse = (follow: HydratedDocument<Follow>): FollowResponse => {
    const followCopy: Follow = {
        ...follow.toObject({
            versionKey: false
        })
    };
    return {
        follower: followCopy.follower.username,
        following: followCopy.following.username
    };
};

export {
    constructFollowResponse,
    constructUserResponse,
    constructFreetResponse
};