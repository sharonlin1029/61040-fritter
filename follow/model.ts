import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

export type Follow = {
    follower: User;
    following: User;
}

const FollowSchema = new Schema<Follow>({
    follower: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    following: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
});

const FollowModel = model<Follow>("Follow", FollowSchema);
export default FollowModel;