import type { HydratedDocument, Types } from 'mongoose';
import { User } from '../user/model';
import type { Follow } from './model';
import FollowModel from './model';
import FreetCollection from '../freet/collection';
import UserCollection from '../user/collection';
import FreetModel, { Freet } from '../freet/model';


class FollowCollection {
    static async followUser(userID: Types.ObjectId | string, userToFollowID: Types.ObjectId | string): Promise<HydratedDocument<Follow>> {
        const follow = new FollowModel({
            follower: userID,
            following: userToFollowID
        });
        await follow.save();
        return follow;
    }

    static async unfollowUser(userID: Types.ObjectId | string, userToUnfollowID: Types.ObjectId | string): Promise<boolean> {
        const unfollow = await FollowModel.deleteOne({ follower: userID, following: userToUnfollowID });
        return unfollow !== null;
    }

    static async getFollowerList(userID: Types.ObjectId | string): Promise<Array<HydratedDocument<Follow>>> {
        return FollowModel.find({ following: userID }).populate(["follower", "following"]);
    }

    static async getFollowingList(userID: Types.ObjectId | string): Promise<Array<HydratedDocument<Follow>>> {
        return FollowModel.find({ follower: userID }).populate(["follower", "following"]);
    }

    static async isFollowing(userID: Types.ObjectId | string, userToFollowID: Types.ObjectId | string): Promise<boolean> {
        const followList = await FollowModel.find({ follower: userID, following: userToFollowID });
        return followList.length > 0;
    }

    static async getUsersFeed(userID: Types.ObjectId | string, filter: string): Promise<Array<HydratedDocument<Freet>>> {
        const followingList = await this.getFollowingList(userID);
        const followingIds = followingList.map((follow) => follow.following._id);
        if (filter === "") {
            return FreetModel.find({ authorId: { $in: followingIds } }).sort({ dateCreated: -1 }).populate('authorId');
        }
        else {
            const keywords = filter.split(",");
            const regexPattern = "^" + keywords.map(s => `(?=.*?\\b${s}\\b)`).join("") + "";
            console.log("regex:", regexPattern);
            return FreetModel.find({ authorId: { $in: followingIds }, content: { "$regex": regexPattern, "$options": "i" } }).sort({ dateCreated: -1 }).populate('authorId');
        }
    }
}

export default FollowCollection;
