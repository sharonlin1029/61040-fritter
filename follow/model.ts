import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

export type Follow = {
    _id: Types.ObjectId;
    user: User;
    following: User;
}

const FollowSchema = new Schema<Follow>({
    user: {
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