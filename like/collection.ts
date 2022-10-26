import type {HydratedDocument, Types} from 'mongoose';
import { User } from 'user/model';
import type {Like} from './model';
import LikeModel from './model';
import FreetCollection from '../freet/collection';


class LikeCollection {
    static async likeFreet(userID: Types.ObjectId | string, freetToLikeID: Types.ObjectId | string): Promise<HydratedDocument<Like>> {
        const date = new Date();
        const like = new LikeModel({
            user: userID,
            freet: freetToLikeID,
            dateLiked: date
        });
        await like.save();
        return like;
    }

    static async unlikeFreet(userID: Types.ObjectId | string, freetToUnlikeID: Types.ObjectId | string): Promise<Boolean> {
        const unlike = await LikeModel.deleteOne({user: userID, freet: freetToUnlikeID});
        return unlike !== null;
    }

    static async getFreetLikes(freetID: Types.ObjectId | string): Promise<Array<HydratedDocument<Like>>> {
        return await LikeModel.find({freet: freetID}).populate("user");
    }

    static async isLiking(userID: Types.ObjectId | string, freetID: Types.ObjectId | string): Promise<Boolean> {
        const likeList = await LikeModel.find({user: userID, freet: freetID});
        return likeList.length > 0;
    }
}

export default LikeCollection;