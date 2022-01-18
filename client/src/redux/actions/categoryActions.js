import * as actionTypes from '../constants.js';
import axios from 'axios';
require('dotenv').config();
const environ = process.env.NODE_ENV;
const baseUrl = environ === 'production' ? '' : 'http://localhost:9000';

export const getCategories = () => {
    console.log('called getCategories')
    return (dispatch) => {
        axios.get(`${baseUrl}/getCategories`)
            .then(res => {
                dispatch({ type: actionTypes.GET_CATEGORIES_SUCCESS, payload: res.data })
            })
            .catch(err =>
                dispatch({ type: actionTypes.GET_CATEGORIES_FAILURE, payload: "Server didn't respond" })
            );
    }
}