import {ORDER_CREATE_REQUEST,ORDER_CREATE_SUCCESS,ORDER_CREATE_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS,ORDER_PAY_FAIL , ORDER_PAY_RESET , ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS ,ORDER_DETAILS_FAIL,  MY_ORDERS_REQUEST,MY_ORDERS_SUCCESS ,MY_ORDERS_FAIL} from '../constants/orderConstants.js';
import axios from "axios";
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const  {userLogin: {userInfo}} = getState();
    const config = {
       headers:{
           "Content-Type":"application/json",
           Authorization:`Bearer ${userInfo.token}`
       }
      }
    const { data } = await axios.post(
      `http://localhost:5000/api/orders`,
      order,
      config
    );

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};




export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`http://localhost:5000/api/orders/${id}`, config)

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {

    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    })
  }
}

export const payOrder = (orderId, paymentResult) => async(dispatch , getState) => {
  try{
    dispatch({
      type:ORDER_PAY_REQUEST,

    })
    const  {userLogin: {userInfo}} = getState();

    const config = {
      headers: {
        'Content-Type':'application/json',
        Authorization:`Bearer ${userInfo.token}`
      }
    }
    const {data} =  await axios.put(`http://localhost:5000/api/orders/${orderId}/pay`,paymentResult, config)

    dispatch({
      type:ORDER_PAY_SUCCESS,
     payload:data
    })
  }
  catch(err){
    dispatch({
      type:ORDER_PAY_FAIL,
      payload: err.response && err.response.data.message
      ? err.response.data.message
      : err.message,
    })

  }
}




export const myOrdersList = () => async(dispatch , getState) => {
  try{
    dispatch({
      type:MY_ORDERS_REQUEST,

    })
    const  {userLogin: {userInfo}} = getState();

    const config = {
      headers: {
        Authorization:`Bearer ${userInfo.token}`
      }
    }
    const { data } =  await axios.get(`http://localhost:5000/api/orders/myorders`, config)

    dispatch({
      type:MY_ORDERS_SUCCESS,
     payload:data
    })
  }
  catch(err){
    dispatch({
      type:MY_ORDERS_FAIL,
      payload: err.response && err.response.data.message
      ? err.response.data.message
      : err.message,
    })

  }
}