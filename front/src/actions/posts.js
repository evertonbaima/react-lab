export const GET_POSTS = 'GET_POSTS';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAIL = 'GET_POSTS_FAIL';
export const GET_POSTS_WARNING = 'GET_POSTS_WARNING';

export const GET_POST_BY_ID = 'GET_POST_BY_ID';
export const GET_POST_BY_ID_SUCCESS = 'GET_POST_BY_ID_SUCCESS';
export const GET_POST_BY_ID_FAIL = 'GET_POST_BY_ID_FAIL';
export const GET_POST_BY_ID_WARNING = 'GET_POST_BY_ID_WARNING';

/**
 */
export function getPosts() {
    return {
        type: GET_POSTS
    }
}

/**
 * @param {number} id 
 */
export function getPostById(id) {
    return {
        type: GET_POST_BY_ID,
        payload: { id }
    }
}
