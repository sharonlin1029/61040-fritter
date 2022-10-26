import type { HydratedDocument, Types } from 'mongoose';
import type { Like } from '../like/model';
import { constructUserResponse } from '../user/util'

type LikeResponse = {
    user: string;
    freet: string;
};

const constructLikeResponse = (like: HydratedDocument<Like>): LikeResponse => {
    const likeCopy: Like = {
        ...like.toObject({
            versionKey: false
        })
    };
    return {
        user: likeCopy.user.username,
        freet: likeCopy.freet._id.toString()
    }
}

export {
    constructLikeResponse,
    constructUserResponse
}