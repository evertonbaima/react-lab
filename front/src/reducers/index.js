import { combineReducers } from 'redux';

import status from './status';

/**
 * Importa os reducers
 */
const storeApp = combineReducers({
    status
});

export default storeApp;
