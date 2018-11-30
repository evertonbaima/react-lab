// Variáveis padrões para exibir status
export const FETCH_WARNING = 'FETCH_WARNING';
export const FETCH_FAIL = 'FETCH_FAIL';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_PROCCESS = 'FETCH_PROCCESS';
export const HIDE_MODAL_ALERT = 'HIDE_MODAL_ALERT';

/**
 */
export function hideModal() {
    return {
        type: HIDE_MODAL_ALERT
    }
}
