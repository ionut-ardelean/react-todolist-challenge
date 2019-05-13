// actions for the todo list can go here...
import * as types from './types';
import { apiGet, apiPost, apiPut, apiDelete } from '../utils';

export function loadListSuccess(data) {
    return { type: types.GET_LIST_SUCCESS, data };
}

export function loadError() {
    return { type: types.GET_LIST_ERRORR };
}

export function addNewItemSuccess() {
    return { type: types.ADD_ITEM_SUCCESS };
}

export function addNewItemError(data) {
    return { type: types.ADD_ITEM_ERROR, data };
}

export function saveItemSuccess(data) {
    return { type: types.SAVE_ITEM_SUCCESS, data };
}

export function saveItemError(data) {
    return { type: types.SAVE_ITEM_ERROR, data };
}

export function deleteItemSuccess() {
    return { type: types.DELETE_ITEM_SUCCESS };
}

export function deleteItemError(data) {
    return { type: types.DELETE_ITEM_ERROR, data };
}

export function errorHandler(error) {
    return { type: types.ERROR, error };
}


export function loadList() {
    return (dispatch) => {
        return apiGet('todo')
        .then(json => dispatch(loadListSuccess(json)))
        .catch(error => {
            dispatch(loadError());
            dispatch(errorHandler(error));
        })
    }
}

export function addNewItem(item) {
    return (dispatch) => {
        dispatch({ type: types.ADDING_ITEM, data: item });
        return apiPost('todo', item)
        .then(json => dispatch(addNewItemSuccess(json)))
        .catch(error => {
            dispatch(addNewItemError(item));
            dispatch(errorHandler(error));
        })
    }

}

export const setEditing = (id) => (
    (dispatch) => {
        dispatch({ type: types.EDIT_ITEM, data: id });
    }
);

export function saveItem(item) {
    return (dispatch) => {
        dispatch({ type: types.SAVING_ITEM, data: item });
        return apiPut(`todo/${item._id}`, item)
        .then(json => dispatch(saveItemSuccess(json)))
        .catch(error => {
            dispatch(saveItemError(item));
            dispatch(errorHandler(error));
        })
    }
}

export function deleteItem(item) {
    return (dispatch) => {
        dispatch({ type: types.DELETING_ITEM, data: item });
        return apiDelete(`todo/${item._id}`, item)
        .then(json => dispatch(deleteItemSuccess(json)))
        .catch(error => {
            dispatch(deleteItemError(item));
            dispatch(errorHandler(error));
        })
    }
}

export const cancelError = () => (
    (dispatch) => {
        dispatch({ type: types.CANCEL_ERROR });
    }
);
