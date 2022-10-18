import type { HydratedDocument } from 'mongoose';
import type { Follow } from '../follow/model';

type FollowResponse = {
    user: string;
    following: string;
};

const constructFollowResponse = (follow: HydratedDocument<Follow>): FollowResponse => {
    const followCopy: Follow = {
        ...follow.toObject({
            versionKey: false
        })
    };
    return {
        user: followCopy.user.username,
        following: followCopy.following.username
    };
};

export {
    constructFollowResponse
};