import {Types, PopulatedDoc, Document, SchemaType} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';
import type {Freet} from '../freet/model';
import UserCollection from 'user/collection';


export type Like = {
    user: User;
    freet: Freet;
    dateLiked: Date;
}

const LikeSchema = new Schema<Like>({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    freet: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Freet"
    },
    dateLiked: {
        type: Date,
        required: true
    }
});

const LikeModel = model<Like>("Like", LikeSchema);
export default LikeModel;