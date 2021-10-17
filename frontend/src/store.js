import {createStore , combineReducers , applyMiddleware} from 'redux';

import thunk from 'redux-thunk';

import {composeWithDevTools} from 'redux-devtools-extension';
import { productListReducer , productDetailsReducer } from './redux/reducers/productReducers';

import {cartReducer} from './redux/reducers/cartReducers.js';
import {userLoginReducer, userUpdateReducer,userListReducer,userDeleteReducer, userRegisterReducer , userDetailsReducer} from './redux/reducers/userReducers.js';

import {orderCreateReducer ,orderPayReducer, orderDetailsReducer, MyOrdersReducer} from './redux/reducers/orderReducers.js';


const reducer = combineReducers({
    productList :productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userList:userListReducer,
    userUpdate:userUpdateReducer,
    userDelete:userDeleteReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    myOrders:MyOrdersReducer,
    
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')): null;
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};
const paymentMethodFromStorage =localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : null;

const initialState = {
    cart : {
        cartItems:cartItemsFromStorage,
        shippingAddress:shippingAddressFromStorage,
        paymentMethod:paymentMethodFromStorage
    },
    userLogin: {
        userInfo:userInfoFromStorage
    }
    
}
const middleware = [thunk];
const store= createStore(reducer , initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;