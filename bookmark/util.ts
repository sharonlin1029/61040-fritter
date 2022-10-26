import type { HydratedDocument, Types } from 'mongoose';
import type { Bookmark } from '../bookmark/model';
import { constructUserResponse } from '../user/util';
import { constructFreetResponse } from '../freet/util';
import FreetModel, { Freet } from '../freet/model';

type BookmarkResponse = {
    freetContent: string;
    freetAuthor: string;
    freetID: string;
    category: string;
    dateSaved: string;
};

const constructBookmarkResponse = (bookmark: HydratedDocument<Bookmark>): BookmarkResponse => {
    const bookmarkCopy: Bookmark = {
        ...bookmark.toObject({
            versionKey: false
        })
    };
    console.log(bookmarkCopy.freet.authorId, bookmarkCopy.category, bookmarkCopy.dateSaved.toString());
    return {
        freetContent: bookmarkCopy.freet.content,
        freetAuthor: bookmarkCopy.freet.authorId.toString(),
        freetID: bookmarkCopy.freet._id.toString(),
        category: bookmarkCopy.category,
        dateSaved: bookmarkCopy.dateSaved.toString()
    }
}

export {
    constructBookmarkResponse,
    constructFreetResponse,
    constructUserResponse
}