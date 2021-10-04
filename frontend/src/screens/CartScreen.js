import React,{useEffect} from 'react';
import {useDispatch , useSelector} from 'react-redux';
import Message from '../components/Message';
import {Row ,Col , ListGroup , Image,Form,Card} from 'react-bootstrap';
import { addToCart, removeFromCart } from '../actions/cartActions';
import {Link} from 'react-router-dom';
import {FaTrash} from 'react-icons/fa';
import Button from '../UI/Button';
const CartScreen = ({match,location,history}) => {

  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;
const productId = match.params.id;

  const dispatch  = useDispatch();
  const qty = location.search ? Number(location.search.split('=')[1]):1
  useEffect(() => {
 if(productId) {
   dispatch(addToCart(productId , qty));
 }
  }, [dispatch,  productId , qty])


const removeFromCartHandler =(id) => {
dispatch(removeFromCart(id));
  
}

const checkoutHandler = (e) => {
  history.push('/login?redirect=shipping');
}

const calculateItemsQty = cartItems.reduce((acc,item) => {
  return acc + item.qty
}, 0)


const calculateTotalPrice = cartItems.reduce((acc, item) => {
  return acc + item.price * item.qty;
},0)


    return(
<Row>
  <Col md={8}>
 <h1>Shopping Cart</h1>
 {cartItems.length === 0 ? <Message> Your cart is empty
   <Link to="/">   Go Back</Link>
 </Message> : (
   <ListGroup variant="flush">
     {cartItems.map(item => (
       <ListGroup.Item key={item.product}>
   <Row>
     <Col md={2}>
       <Image src={item.image} alt={item.name} fluid rounded/>
     </Col>
     <Col md={3}>
       <Link to={`/product/${item.product}`}>{item.name}</Link>
     </Col>
     <Col md={2}>${item.price}</Col>
     <Col md={2}>
       <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product , Number(e.target.value)))}>
       {[...Array(item.countInStock).keys()].map(x => (
         <option key={x + 1} value={x + 1}>{x + 1}</option>
       ))}
       </Form.Control>
     </Col>
     <Col md={2}>
  <Button type="button" variant="light" onClick={(e) => removeFromCartHandler(item.product)}>
         <i><FaTrash/></i>
       </Button> 
     </Col>
   </Row>
       </ListGroup.Item>
     ))}
   </ListGroup>
 )}
  </Col>

  <Col md={4}>
  <Card>
    <ListGroup variant="flush">
<ListGroup.Item>
  <h2>Subtotal {calculateItemsQty} items</h2>
{calculateTotalPrice.toFixed(2)}
</ListGroup.Item>
<ListGroup.Item>
  <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={checkoutHandler} >
    Proceed to Checkout
  </Button>
</ListGroup.Item>
    </ListGroup>
  </Card>

</Col>
</Row>
    )
}

export default CartScreen;