import { all } from 'redux-saga/effects';

import { watchGetPosts, watchGetPostById } from './posts';

/**
 * Importa os observadores de actions
 */
export default function* rootSaga() {
    yield all([
        watchGetPosts(),
        watchGetPostById()
    ]);
}
