import * as types from '../actions/types';
import { combineReducers } from 'redux';

const initialState = [];

export const list = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LIST_SUCCESS:
      return action.data;
    case types.ADDING_ITEM:
      return [...state, action.data];
    case types.DELETE_ITEM_ERROR:
      return state.map(
        (item) => item._id === action.data._id ? { ...item, hidden: false } : item)
    case types.SAVING_ITEM:
    case types.SAVE_ITEM_ERROR:
      return state.map(
        (item) => item._id === action.data._id ? { ...item, title: action.data.title } : item)
    case types.DELETING_ITEM:
      return state.map(
        (item) => item._id === action.data._id ? { ...item, hidden: true } : item)
    case types.ADD_ITEM_ERROR:
      return state.filter(
        (item) => item._id !== action.data._id)
    default:
      return state;
  }
}

export const editingItem = (state = null, action) => {
  switch (action.type) {
    case types.EDIT_ITEM:
      return action.data;
    default:
      return state;
  }
}

export const error = (state = null, action) => {
  switch (action.type) {
    case types.GET_LIST_SUCCESS:
    case types.EDIT_ITEM:
    case types.ADDING_ITEM:
    case types.SAVING_ITEM:
    case types.DELETING_ITEM:
    case types.ADD_ITEM_SUCCESS:
    case types.SAVE_ITEM_SUCCESS:
    case types.DELETE_ITEM_SUCCESS:
    case types.CANCEL_ERROR:
      return null;
    case types.ERROR:
      return action.error;
    default:
      return state;
  }
}

export default combineReducers({
  list,
  editingItem,
  error
});

