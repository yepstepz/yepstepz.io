import {
    ARTICLES_LIST_LOADING,
    ARTICLES_LIST_FETCHED
} from "../../shared/constants";

export const articlesListReducer = (state, action) => {
    switch (action.type) {
        case ARTICLES_LIST_LOADING:
            return {
                ...state,
                loading: true
            };
        case ARTICLES_LIST_FETCHED:
            return {
                ...state,
                loading: false,
                articles: action.articles
            }
        default:
            return state;
    }
};
