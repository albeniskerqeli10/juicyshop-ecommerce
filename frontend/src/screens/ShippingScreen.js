import { Form } from "react-bootstrap";
import Button from "../UI/Button";
import TextInput from "../UI/TextInput";
import { useDispatch } from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../redux/actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import useForm from '../hooks/useForm';
const ShippingScreen = ({history}) => {
  const {formData , handleInputChange}  =useForm({
    address:'',
    city:'',
    postalCode:'',
    country:''
  })
const {address,city,postalCode,country} = formData;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/payment');

  };
  return (
    <FormContainer>
    <CheckoutSteps step1 step2/>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <TextInput
          type="text"
          controlId="address"
          name="address"
          value={address}
          onChange={handleInputChange}
          placeholder="Enter address" required="Please enter a valid address"
        >
          <Form.Label>Address</Form.Label>
        </TextInput>
        <TextInput
          type="text"
          controlId="city"
          name="city"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city" required  title="Please enter a valid city"
        >
          <Form.Label>City</Form.Label>
        </TextInput>
        <TextInput
          type="text"
          name="postalCode"
          controlId="postalCode"
          value={postalCode}
          onChange={handleInputChange}
          placeholder="Enter postal code" required title="Please enter a valid postal code"
        >
          <Form.Label>Postal Code</Form.Label>
        </TextInput>
        <TextInput
          type="text"
          controlId="country"
          name="country"
          value={country}
          onChange={handleInputChange}
          placeholder="Enter Country" required title="Please enter a valid country"
        >
          <Form.Label>Country</Form.Label>
        </TextInput>
        <Button type="submit" variant="primary">
        Continue
      </Button>
      </Form>

    </FormContainer>
  );
};

export default ShippingScreen;
