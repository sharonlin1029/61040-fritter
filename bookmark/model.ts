import {Types, PopulatedDoc, Document, SchemaType} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';
import type {Freet} from '../freet/model';

export type Bookmark = {
    user: User;
    freet: Freet;
    category: string;
    dateSaved: Date
}

const BookmarkSchema = new Schema<Bookmark>({
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
    category: {
        type: String,
        required: true
    },
    dateSaved: {
        type: Date,
        required: true
    }
});

const BookmarkModel = model<Bookmark>("Bookmark", BookmarkSchema);
export default BookmarkModel;