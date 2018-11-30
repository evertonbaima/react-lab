import {
    FETCH_PROCCESS, FETCH_SUCCESS, FETCH_FAIL, FETCH_WARNING, HIDE_MODAL_ALERT
} from '../actions';

/**
* Reducer que gerencia actions relacionadas a modal de status
*/
function status(state = [], action) {
    switch (action.type) {
        case FETCH_PROCCESS:
            return proccess(state, action);

        case FETCH_SUCCESS:
            return finish(state, action);

        case FETCH_FAIL:
            return failed(state, action);

        case '':
            return success(state, action);

        case FETCH_WARNING:
            return warning(state, action);

        case HIDE_MODAL_ALERT:
            return hideModal(state, action);

        default:
            return state;
    }
}

/**
 * Exibe a modal de status de sucesso. Envie { message: "sua mensagem" } 
 * no payload para personalizar a mensagem exibida.
 * Oculta automaticamente após 2 segundos.
 */
function finish(state, action) {
    return hideModal();
}

/**
 * 
 */
function success(state, action) {
    return {
        icon: { name: 'check', size: 'lg' },
        className: 'alert-success',
        title: 'status__sucesso__titulo',
        message: 'status__sucesso__mensagem_padrao',
        showModal: true
    };
}

/**
 * Exibe a modal de status de informação. Envie { message: "sua mensagem" }
 *  no payload para personalizar a mensagem exibida.
 * Envie { autohide: true } no payload para ocultar a mensagem após 3 segundos.
 */
function proccess(state, action) {
    return {
        icon: { name: 'cog', size: 'lg', spin: true },
        className: 'alert-info',
        title: 'status__processando__titulo',
        message: (action.payload && action.payload.message) ? action.payload.message : 'status__processando__mensagem_padrao',
        showModal: true
    };
}

/**
 * Exibe a modal de status de alerta. Envie { message: "sua mensagem" }
 *  no payload para personalizar a mensagem exibida.
 */
function warning(state, action) {
    let retorno = {
        icon: { name: 'exclamation-triangle', size: 'lg' },
        className: 'alert-warning',
        title: 'status__aviso__titulo',
        message: 'status__aviso__mensagem_padrao',
        showModal: true
    };

    try {
        const jsonError = JSON.parse(action.payload.message);
        retorno.message = (jsonError && jsonError.message) ? jsonError.message : retorno.message;
    } catch (error) {
        retorno.message = (action.payload && action.payload.message) ? action.payload.message : retorno.message;
    }

    return retorno;
}

/**
 * Exibe a modal de status de erro. Envie { message: "sua mensagem" }
 *  no payload para personalizar a mensagem exibida.
 */
function failed(state, action) {
    let retorno = {
        icon: { name: 'times-circle', size: 'lg' },
        className: 'alert-danger',
        title: 'status__falha__titulo',
        message: 'status__falha__mensagem_padrao',
        showModal: true
    };

    try {
        const jsonError = JSON.parse(action.payload.message);
        retorno.message = (jsonError && jsonError.message) ? jsonError.message : retorno.message;
    } catch (error) {
        retorno.message = (action.payload && action.payload.message) ? action.payload.message : retorno.message;
    }

    return retorno;
}

/**
 * Oculta a modal de status.
 */
function hideModal(state, action) {
    return {
        icon: { name: '' },
        className: '',
        title: '*',
        message: '*',
        showModal: false
    };
}

export default status;
