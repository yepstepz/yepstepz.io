import {
    ARTICLE_LOADING,
    ARTICLE_FETCHED
} from "../../shared/constants";

export const articleReducer = (state, action) => {
    switch (action.type) {
        case ARTICLE_LOADING:
            return {
                ...state,
                loading: true
            };
        case ARTICLE_FETCHED:
            return {
                ...state,
                ...action.payload,
                loading: false
            }
        default:
            return state;
    }
};
