import { articleReducer } from "./article";
import { articlesListReducer } from "./articles-list";

export const mainReducer = ({ articlePages, articlesList }, action) => {
    // middleware goes here, i.e calling analytics service, etc.
    return {
        articlePages: articleReducer(articlePages, action),
        articlesList: articlesListReducer(articlesList, action)
    };
}
