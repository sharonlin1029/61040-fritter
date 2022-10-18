import type {HydratedDocument, Types} from 'mongoose';
import type {Follow} from './model';
import FollowModel from './model';
import UserCollection from '../user/collection';


class FollowCollection {
    static async followUser(userID: Types.ObjectId | string, userToFollowID: Types.ObjectId | string): Promise<HydratedDocument<Follow>> {
        const follow = new FollowModel({
            follower: await UserCollection.findOneByUserId(userID),
            following: await UserCollection.findOneByUserId(userToFollowID)
        });
        await follow.save();
        return follow;
    }

    static async getFollowerList(userID: Types.ObjectId | string): Promise<Array<HydratedDocument<Follow>>> {
        return FollowModel.find({following: UserCollection.findOneByUserId(userID)}).populate("user");
    }

    static async getFollowingList(UserID: Types.ObjectId | string): Promise<Array<HydratedDocument<Follow>>> {
        return FollowModel.find({user: UserCollection.findOneByUserId(UserID)}).populate("following")
    }

    static async unfollowUser(UserID: Types.ObjectId | string, userToUnfollowID: Types.ObjectId | string): Promise<void> {
        const follow = await FollowModel.deleteOne({user: UserID, following: userToUnfollowID})
    }
}

export default FollowCollection;