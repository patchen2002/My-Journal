import Axios from 'axios';
import { POST_DELETE_FAIL, POST_DELETE_REQUEST, POST_DELETE_SUCCESS, POST_FAIL, POST_ONE_FAIL, POST_ONE_REQUEST, POST_ONE_SUCCESS, POST_REQUEST, POST_SUCCESS } from '../constants/postConstants';

export const newPost = (senderEmail, textBody, title, shared) => async (dispatch) => {
    dispatch({ type: POST_REQUEST, payload: { senderEmail, textBody, title, shared } });
    try {
        const { data } = await Axios.post('http://localhost:3000/api/posts/', { senderEmail, textBody, title, shared });
        dispatch({ type: POST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: POST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const getPost = (id) => async (dispatch) => {
    dispatch({ type: POST_ONE_REQUEST, payload: { id } });
    try {
        const { data } = await Axios.post('http://localhost:3000/api/posts/get', { id });
        dispatch({ type: POST_ONE_SUCCESS, payload: data });
        localStorage.setItem("foundPost", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: POST_ONE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const getAllPosts = (email) => async (dispatch) => {
    dispatch({ type: POST_REQUEST, payload: { email } });
    try {
        const { data } = await Axios.post("http://localhost:3000/api/posts/user", { email });
        dispatch({ type: POST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: POST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const patchPost = (_id, senderEmail, textBody, title, shared) => async (dispatch) => {
    dispatch({ type: POST_REQUEST, payload: { senderEmail, textBody, title, shared } });
    try {
        const { data } = await Axios.patch(`http://localhost:3000/api/posts/${_id}`, { senderEmail, textBody, title, shared });
        dispatch({ type: POST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: POST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const deletePost = (_id) => async (dispatch) => {
    dispatch({ type: POST_DELETE_REQUEST, payload: {} });
    try {
        const { data } = await Axios.delete(`http://localhost:3000/api/posts/${_id}`);
        dispatch({ type: POST_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: POST_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};