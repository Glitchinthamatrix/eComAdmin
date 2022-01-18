import * as actionTypes from '../constants';

export const getAllImagesReducer = (state = { images: [] }, action) => {
    switch (action.type) {
        case actionTypes.GET_IMAGES_LOADING:
            return { loading: true, images: [], error: '' }
        case actionTypes.GET_IMAGES_SUCCESS:
            return { loading: false, images: action.payload, error: '' }
        case actionTypes.GET_IMAGES_FAILURE:
            return { loading: false, images: [], error: action.payload }
        default:
            return state;
    }
}