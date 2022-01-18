import * as actionTypes from '../constants';

export const getCategoriesReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case actionTypes.GET_CATEGORIES_LOADING:
            return { loading: true, categories: [], error: '' }
        case actionTypes.GET_CATEGORIES_SUCCESS:
            return { loading: false, categories: action.payload, error: '' }
        case actionTypes.GET_CATEGORIES_FAILURE:
            return { loading: false, categories: [], error: action.payload }
        default:
            return state;
    }
}