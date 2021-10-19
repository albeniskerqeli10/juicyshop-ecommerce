import { useState, useEffect } from "react";
import { getOrderDetails, payOrder } from "../redux/actions/orderActions";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, ListGroup, Card, Image } from "react-bootstrap";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import { PayPalButton } from "react-paypal-button-v2";
import {ORDER_PAY_RESET} from '../redux/constants/orderConstants.js';
import axios from "axios";
const OrderScreen = ({ match }) => {
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  const orderId = match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const {loading:loadingPay, success: successPay } = orderPay;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {

    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get(
        "https://juicyshop-backend.herokuapp.com/api/config/paypal"
      );
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay) {
      dispatch({
        type:ORDER_PAY_RESET  
      })
      dispatch(getOrderDetails(orderId));

    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order]);
  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems
        .reduce((acc, item) => acc + item.price * item.qty, 0)
        .toFixed(2)
    );
  }

const successPaymentHandler =(paymentResult) => {
console.log(paymentResult, 'Payment Result')
dispatch(payOrder(orderId,  paymentResult));
}

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {userInfo.name}{" "}
              </p>
              <p>
                <a href={`mailto:${userInfo.email}`}> {userInfo.email} </a>
              </p>

              <p>
                <strong>Address</strong>
                {order.shippingAddress.address} , {order.shippingAddress.city} ,{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered On {order.DeliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid On {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item) => (
                    <ListGroup.Item key={Math.random() * 0.45}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                {loadingPay && <Loader/>}
                {!sdkReady ? <Loader/> : (
                  <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}></PayPalButton>
                )}
                </ListGroup.Item>
              )}
              <ListGroup.Item>
               
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
