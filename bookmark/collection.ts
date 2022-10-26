import type {HydratedDocument, Types} from 'mongoose';
import type { Bookmark } from './model';
import BookmarkModel from './model';

class BookmarkCollection {
    // save a bookmark (optionally to a collection)
    static async bookmarkFreet(userID: Types.ObjectId | string, freetToSaveID: Types.ObjectId | string, category: string): Promise<HydratedDocument<Bookmark>> {
        const date = new Date();
        const bookmark = new BookmarkModel({
            user: userID,
            freet: freetToSaveID,
            category: category,
            dateSaved: date
        });
        await bookmark.save();
        return bookmark.populate("freet");
    }

    // unsave a bookmark
    static async unbookmarkFreet(userID: Types.ObjectId | string, freetToUnsaveID: Types.ObjectId | string): Promise<Boolean> {
        const unsave = await BookmarkModel.deleteOne({user: userID, freet: freetToUnsaveID});
        return unsave !== null;
    }


    // move bookmark to another collection (or not have it in one)
    static async moveBookmarkToAnotherCategory(userID: Types.ObjectId | string, freetToMoveID: Types.ObjectId | string, newCategory: string): Promise<HydratedDocument<Bookmark>> {
        const bookmark = await BookmarkModel.findOne({user: userID, freet: freetToMoveID});
        bookmark.category = newCategory;
        await bookmark.save();
        return bookmark.populate("freet");
    }


    // get all bookmarks
    static async getAllBookmarks(userID: Types.ObjectId | string): Promise<Array<HydratedDocument<Bookmark>>> {
        return BookmarkModel.find({}).sort({dateSaved: -1}).populate("freet");
    }

    // get all bookmarks in a collection
    static async getBookmarksInCategory(userID: Types.ObjectId | string, category: string): Promise<Array<HydratedDocument<Bookmark>>> {
        return BookmarkModel.find({user: userID, category: category}).sort({dateSaved: -1}).populate("freet");
    }

    static async getAllBookmarkCategories(userID: Types.ObjectId | string): Promise<Array<String>> {
        const allBookmarks = await BookmarkModel.find({user: userID});
        const bookmarkCategories = allBookmarks.map((bookmark) => bookmark.category);
        return new Array(...(new Set(bookmarkCategories)));
    }

    // check if bookmark is saved
    static async alreadyBookmarked(userID: Types.ObjectId | string, freetID: Types.ObjectId | string): Promise<Boolean> {
        const bookmarkList = await BookmarkModel.find({user: userID, freet: freetID});
        return bookmarkList.length > 0;
    }
}

export default BookmarkCollection;