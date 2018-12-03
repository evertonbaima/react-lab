import { replaceArrayContent } from '../Util';
import {
    GET_POSTS_SUCCESS,
    GET_POST_BY_ID_SUCCESS
} from '../actions/posts';

const _initState = {
    allPosts: [],
    postById: null
};

/**
* Reducer que gerencia actions relacionadas a modal de status
*/
export default function posts(state, action) {
    switch (action.type) {
        case GET_POSTS_SUCCESS:
            return getPostsSuccess(state, action);
        case GET_POST_BY_ID_SUCCESS:
            return getPostByIdSuccess(state, action);
        default:
            return (state || { ..._initState });
    }
}

function getPostsSuccess(state, action) {
    let newState = { ...state };
    replaceArrayContent(newState.allPosts, action.payload);

    return newState;
}

function getPostByIdSuccess(state, action) {
    let newState = { ...state };
    newState.postById = action.payload;

    return newState;
}
