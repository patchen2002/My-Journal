import { POST_DELETE_FAIL, POST_DELETE_REQUEST, POST_DELETE_SUCCESS, POST_FAIL, POST_ONE_FAIL, POST_ONE_REQUEST, POST_ONE_SUCCESS, POST_REQUEST, POST_SUCCESS } from "../constants/postConstants";

export const postListReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
        case POST_REQUEST:
            return { loading: true };
        case POST_SUCCESS:
            return { loading: false, posts: action.payload };
        case POST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const postReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_ONE_REQUEST:
            return { loading: true };
        case POST_ONE_SUCCESS:
            return { loading: false, foundPost: action.payload };
        case POST_ONE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const postDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_DELETE_REQUEST:
            return { loading: true };
        case POST_DELETE_SUCCESS:
            return { loading: false, deletedPost: action.payload };
        case POST_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}