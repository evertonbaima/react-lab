import { combineReducers } from 'redux';

import status from './status';
import posts from './posts';

/**
 * Importa os reducers
 */
const storeApp = combineReducers({
    status,
    posts
});

export default storeApp;
