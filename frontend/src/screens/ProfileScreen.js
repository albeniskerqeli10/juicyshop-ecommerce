import  {useState , useEffect} from 'react';

import {Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import {FaTimes} from "react-icons/fa";

import {Form,Row,Col,  Table} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message'
import {myOrdersList} from '../redux/actions/orderActions.js';
import Loader from '../components/Loader';
import TextInput from '../UI/TextInput';
import Button from '../UI/Button';
import {getUserDetails} from '../redux/actions/userActions.js';
const ProfileScreen = ({location , history, match}) => {
    const userId = match.params.id;
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [message,setMessage] = useState('');
    const redirect = location.search ? location.search.split('=')[1]: '/'
const dispatch = useDispatch();
const userDetails = useSelector(state => state.userDetails);
const userLogin = useSelector(state => state.userLogin);
const myOrders =  useSelector(state => state.myOrders);
const {orders,loading:loadingOrder ,error:errorOrder} = myOrders;

const {userInfo} = userLogin;
const {loading  ,error , user}  = userDetails;

 const submitHandler = (e) => {
       console.log('Submit Handler');
       dispatch(getUserDetails(userId));
 } 


const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
}
const handleName = (e) => {
    e.preventDefault();

    setName(e.target.value);
}



useEffect(() => {
    if(!userInfo) {
        history.push("/login");
    } else {
          if(!user.name) {
                dispatch(getUserDetails('profile'));
                          dispatch(myOrdersList());

          } else {
                setName(user.name);
                setEmail(user.email);
          }
    }
    
},[history,userInfo , user , dispatch])
    
    return (
    <Row>
          <Col md={3}>
  <h2>User Profile</h2>
  {message && <Message variant='danger'>{message}</Message>}
  {error && <Message variant='danger'>{error}</Message>}
  {loading && <Loader/>}
  <Form onSubmit={submitHandler}>
  <TextInput type="text" placeholder="Enter name" value={name} onChange={handleName}>
  <Form.Label>Name</Form.Label>

  </TextInput>
  <TextInput type="text" placeholder="Enter email" value={email} onChange={handleEmail}>
  <Form.Label>Email</Form.Label>

  </TextInput>
<Button variant="primary">Submit</Button>
  </Form>
          </Col>
          <Col md={9} >
              <h2>My Orders</h2>
              {loadingOrder ? <Loader/> : errorOrder ? <Message variant="warning">{errorOrder}</Message> :(
                  <Table striped bordered hover responsive className='table-sm'>
                  <thead>
                      <tr>
<th>ID</th>
<th>DATE</th>
<th>TOTAL</th>
<th>PAID</th>
<th>DELIVERED</th>
                      </tr>

                  </thead>
                  <tbody>
                      {orders ? orders.map(order => (
                          <tr key={order._id}>
                              <td>{order._id}</td>
                              <td>{order.createdAt.substring(0,10)}</td>
                              <td>{order.totalPrice}</td>
                              <td>{order.isPaid ? order.paidAt.substring(0,10) : (<FaTimes/>)}</td>
                              <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : (<FaTimes style={{color:"red"}}/>)}</td>
                              <td>
                                  <LinkContainer to={`/order/${order._id}`}>
                                      <Button variant='light'>Details</Button>
                                  </LinkContainer>
                              </td>
                          </tr>
                      )) : ' Searching Orders'}
                  </tbody>
                  </Table>
              )}
          </Col>
    </Row>
    )
}
export default ProfileScreen;