import { takeEvery } from 'redux-saga/effects';
import {
    GET_POSTS, GET_POSTS_SUCCESS, GET_POSTS_FAIL, GET_POSTS_WARNING,
    GET_POST_BY_ID, GET_POST_BY_ID_SUCCESS, GET_POST_BY_ID_FAIL, GET_POST_BY_ID_WARNING
} from '../actions/posts';
import {
    fetchUrl, API_POSTS
} from '../Util';

export function* getPosts(request) {
    const url = `${API_POSTS}`;

    yield fetchUrl(url, GET_POSTS_SUCCESS, GET_POSTS_FAIL, GET_POSTS_WARNING);
}

export function* getPostById(request) {
    const url = `${API_POSTS}/${request.payload.id}`;

    yield fetchUrl(url, GET_POST_BY_ID_SUCCESS, GET_POST_BY_ID_FAIL, GET_POST_BY_ID_WARNING, request.payload);
}

export function* watchGetPosts() {
    yield takeEvery(GET_POSTS, getPosts);
}

export function* watchGetPostById() {
    yield takeEvery(GET_POST_BY_ID, getPostById);
}
