import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';
import {savePaymentMethod} from '../redux/actions/cartActions';
import {Form,Col} from 'react-bootstrap';
import Button from '../UI/Button';
import TextInput from '../UI/TextInput';

const PaymentScreen = ({history}) => {
      const cart = useSelector(state => state.cart);
      const {shippingAddress } = cart;

      if(!shippingAddress) {
history.push('/shipping');
      }
const [paymentMethod , setPaymentMethod] = useState('');

const dispatch = useDispatch();

const submitHandler = (e) => {
      e.preventDefault();
     
            dispatch(savePaymentMethod(paymentMethod));
            history.push('/placeorder');
       
}

      return (
            <FormContainer>
                 <CheckoutSteps step1 step2 step3/> 
                 <h1>Payment Method</h1>
                 <Form onSubmit = {submitHandler}>
                       <Form.Group>
                   <Form.Label as='legend'>Select Method</Form.Label>
                       <Col>
                             <Form.Check type='radio' value="Paypal" label="Paypal or Credit Card" id='Paypal' name='paymentMethod'  onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                                         </Col>
                                         </Form.Group>

                                         <Button type="submit" variant="primary">Continue</Button>
                 </Form>
            </FormContainer>
      )
}

export default PaymentScreen
