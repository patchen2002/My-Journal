import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { postDeleteReducer, postListReducer, postReducer } from './reducer/postReducer';
import { userSigninReducer } from './reducer/userReducer';

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    },
    onePost: {
        foundPost: localStorage.getItem('foundPost') ? JSON.parse(localStorage.getItem('foundPost')) : null
    }
};
const reducer = combineReducers({
    userSignin: userSigninReducer,
    postList: postListReducer,
    onePost: postReducer,
    deletePost: postDeleteReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;