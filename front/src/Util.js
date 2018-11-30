import { put } from 'redux-saga/effects';
import { bindActionCreators } from 'redux';
import fetch from 'isomorphic-fetch';
import { FETCH_FAIL, FETCH_WARNING } from './actions';

import * as ActionCreatorStatus from './actions/index';

// Variáveis globais informadas no arquivo de configuração do webpack
export const ENV = process.env.NODE_ENV;
export const ENV_PRODUCTION = 'production';
export const ENV_DEVELOPMENT = 'development';

const API_URL_PRODUCAO = process.env.REACT_APP_API_URL_PRODUCAO;
const API_URL_HOMOLOGACAO = process.env.REACT_APP_API_URL_HOMOLOGACAO;
const API_URL = (ENV === ENV_PRODUCTION) ? API_URL_PRODUCAO : API_URL_HOMOLOGACAO;

//ROTAS
export const API_POSTS = API_URL + process.env.REACT_APP_API_POSTS;
export const API_COMMENTS = API_URL + process.env.REACT_APP_API_COMMENTS;
export const API_PROFILE = API_URL + process.env.REACT_APP_API_PROFILE;

if (!String.prototype.padStart) {
    // eslint-disable-next-line
    String.prototype.padStart = function padStart(targetLength, padString) {
        // eslint-disable-next-line
        targetLength = targetLength >> 0;

        padString = String((typeof padString !== 'undefined' ? padString : ' '));

        if (this.length > targetLength) {
            return String(this);
        } else {
            // eslint-disable-next-line
            targetLength = targetLength - this.length;

            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length);
            }

            return padString.slice(0, targetLength) + String(this);
        }
    };
}

/**
 * Função para transformar um objeto em parâmetros de url (var1=valor1)
 * 
 * @export
 * @param {any} obj
 * @returns
 */
export function serializeObjToUrl(obj) {
    return `?${Object.keys(obj).reduce(
        (a, k) => {
            a.push(`${k}=encodeURIComponent(${obj[k]})`);
            return a;
        }, []).join('&')}`;
}

/**
 * Função para transformar apenas a primeira letra de cada palavra em caixa alta
 * 
 * @export
 * @param {any} str
 * @returns
 */
export function toTitleCase(str) {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

/**
 * 
 */
export function mapStateToProps(state) {
    return {
        status: state.reducers.status
    };
}

/**
 * 
 */
export function mapDispatchToProps(dispatch) {
    return {
        action: {
            status: bindActionCreators(ActionCreatorStatus, dispatch)
        }
    };
}

/**
 * Executa uma requisição a uma url usando Fetch.
 * 
 * @export
 * @param {string} url
 * @param {string} successAction
 * @param {string} [errorAction="FETCH_FAIL"]
 * @param {string} [warningAction="FETCH_WARNING"]
 * @param {object} [parametros={}]
 * @param {object} [query={}]
 * @param {object} [callback=null]
 */
export function* fetchUrl(url, successAction, errorAction = FETCH_FAIL, warningAction = FETCH_WARNING, parametros = {}, query = {}, callback = null) {
    try {
        const response = yield fetch(url, parametros);
        let jsonData = null;

        try {
            jsonData = yield response.json();
        } catch (error) {
            jsonData = null;
        }

        if (response.status >= 200 && response.status < 300) {
            yield put({ type: successAction, parametros, query, payload: jsonData });

            if (callback) {
                yield put({ ...callback, parametros, query, payload: { ...callback.payload, carga: jsonData } });
            }
        } else if (response.status >= 400 && response.status < 500) {
            const message = (jsonData.Message || jsonData.message || jsonData);

            yield put({ type: warningAction, parametros, query, payload: { message } });
        } else if (response.status < 200 || response.status >= 500) {
            yield put({ type: errorAction, parametros, query, payload: { message: jsonData } });
        }
    } catch (error) {
        yield put({ type: errorAction, parametros, query, payload: { message: error } });
    }
}

/**
 * Formatar a data
 */
export function formatDate(dateTime) {
    if (!dateTime) {
        return dateTime;
    }

    if (dateTime.toString().indexOf('/') >= 0) {
        let parts = dateTime.toString().split('/');

        if (!parts[0] || parts[0].length !== 2) {
            return dateTime;
        }

        if (!parts[1] || parts[1].length !== 2) {
            return dateTime;
        }

        if (parts[2] && parts[2].length !== 4) {
            return dateTime;
        }
    }

    let date = new Date(dateTime);

    if (isDatetime(date)) {
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();

        return [day, month, year].join('/');
    }

    return null;
}

/**
 * Formatar a data/hora
 */
export function formatDateTime(dateTime) {
    if (!dateTime) {
        return dateTime;
    }

    if (dateTime.toString().indexOf('/') >= 0) {
        let parts = dateTime.toString().split('/');

        if (!parts[0] || parts[0].length !== 2) {
            return dateTime;
        }

        if (!parts[1] || parts[1].length !== 2) {
            return dateTime;
        }

        if (parts[2] && parts[2].length !== 4) {
            return dateTime;
        }
    }

    let date = new Date(dateTime);

    if (isDatetime(date)) {
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();
        let hour = date.getHours().toString().padStart(2, '0');
        let minute = date.getMinutes().toString().padStart(2, '0');
        let second = date.getSeconds().toString().padStart(2, '0');

        return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
    }

    return null;
}

/**
 * Verifica se o valor passado é numérico.
 * @param {any} value
 * @returns {boolean}
 */
export function isNumber(value) {
    return value !== null && value.toString().trim().length > 0 && !isNaN(value) && isFinite(value);
}

/**
 * 
 * @param {any} value 
 * @returns {boolean}
 */
export function isDatetime(value) {
    if (!value) {
        return true;
    }

    if (value.toString().indexOf('/') >= 0) {
        let arrDate = value.toString().split('/');

        if (arrDate[0] && arrDate[0].length !== 2) {
            return false;
        }

        if (arrDate[1] && arrDate[1].length !== 2) {
            return false;
        }

        if (arrDate[2] && arrDate[2].length !== 4) {
            return false;
        }

        if (isNaN(new Date(arrDate[2] + '-' + arrDate[1] + '-' + arrDate[0]).getTime())) {
            return false;
        }
    } else {
        if (isNaN(new Date(value).getTime())) {
            return false;
        }
    }

    return true;
}

/**
 * 
 * @param {string} mensagem1 
 * @param {string} mensagem2 
 * @param {function} callback 
 */
export function doubleConfirmation(mensagem1, mensagem2, callback) {
    if (window.confirm(mensagem1)) {
        if (window.confirm(mensagem2)) {
            callback();
        }
    }

    return;
}

/**
 * 
 * @param {string} value 
 * @param {any} defaultValue 
 * @returns {any}
 */
export function tryParseInt(value, defaultValue = null) {
    if (value[0] === '.') {
        return defaultValue;
    }

    return isNumber(value) ? parseInt(value, 10) : defaultValue;
}

/**
 * 
 * @param {string} value 
 * @param {any} defaultValue 
 * @returns {any}
 */
export function tryParseFloat(value, defaultValue = null) {
    if (value[0] === '.') {
        return defaultValue;
    }

    if (value.split('.').length - 1 > 1) {
        return defaultValue;
    }

    if (value[0] !== '.' && value[value.length - 1] === '.') {
        return value;
    }

    return isNumber(value) ? parseFloat(value, 10) : defaultValue;
}

/**
 * 
 * @param {string} value 
 * @param {any} defaultValue 
 * @returns {Date}
 */
export function tryParseDate(value, defaultValue = null) {
    if (!isDatetime(value)) {
        return defaultValue;
    }

    if (value.toString().indexOf('/') >= 0) {
        let arrDate = value.toString().split('/');
        return new Date(arrDate[2], parseInt(arrDate[1], 10) - 1, arrDate[0]);
    } else {
        return new Date(value);
    }
}

/**
 * 
 * @returns {Date}
 */
export function getToday() {
    let data = new Date();
    data.setMilliseconds(0);
    data.setSeconds(0);
    data.setMinutes(0);
    data.setHours(0);

    return data;
}

/**
 * permite fazer buscas por id em um objeto contendo as mensagens em cada idioma suportado.
 * @param {*} nestedMessages 
 * @param {*} prefix 
 */
export function flattenMessages(nestedMessages, prefix = '') {
    return Object.keys(nestedMessages).reduce((messages, key) => {
        let value = nestedMessages[key];
        let prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'string') {
            messages[prefixedKey] = value;
        } else {
            Object.assign(messages, flattenMessages(value, prefixedKey));
        }

        return messages;
    }, {});
}

/**
 * 
 * @param {string} valor 
 * @param {string} mascara 
 * @param {string} placeholder 
 */
export function aplicarMascara(valor, mascara, placeholder) {
    let newValor = mascara.split('');

    for (let i = 0; i < valor.length; i++) {
        let newIndex = newValor.indexOf(placeholder);

        if (newIndex < 0) {
            break;
        }

        let item = valor[i];
        newValor[newIndex] = item;
    }

    var newValorString = newValor.join('');
    var newValorSubstring = newValorString.substring(0, newValorString.indexOf(placeholder));

    return (newValorSubstring || newValorString);
}
