import * as actionTypes from '../constants.js';
import axios from 'axios';
require('dotenv').config();
const environ = process.env.NODE_ENV;
const baseUrl = environ === 'production' ? '' : 'http://localhost:9000';

export const getAllImages = () => {
    console.log('called getCategories')
    return (dispatch) => {
        axios.get(`${baseUrl}/images`)
            .then(res => {
                console.log('image action response: ', res.data.files)
                dispatch({ type: actionTypes.GET_IMAGES_SUCCESS, payload: res.data.files })
            })
            .catch(err =>
                dispatch({ type: actionTypes.GET_IMAGES_FAILURE, payload: "Server didn't respond" })
            );
    }
}