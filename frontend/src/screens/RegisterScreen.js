import  {useState , useEffect} from 'react';

import {Link} from 'react-router-dom';
import {Form,Row,Col} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import {register} from '../redux/actions/userActions.js';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message'
import Loader from '../components/Loader';
import TextInput from '../UI/TextInput';
import Button from '../UI/Button';
import useForm from '../hooks/useForm';


const RegisterScreen = ({location , history}) => {
    const {formData, handleInputChange} = useForm({
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
    })
    const {name,email,password,confirmPassword} = formData;
    const [message,setMessage] = useState(null);
    const redirect = location.search ? location.search.split('=')[1]: '/'
const dispatch = useDispatch();
const userRegister = useSelector(state => state.userRegister);
const {loading  ,error , userInfo}  = userRegister;
const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword ) {
        setMessage('Password do not match');
    }
else {
    dispatch(register(name,email,password));
}

}


useEffect(() => {
    if(userInfo) {
        history.push(redirect);
    }
},[history,userInfo,redirect])
    
    return (
    <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant="danger">{message}</Message>}

        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
                <TextInput type="text" name="name" placeholder="Enter Name" value={name} onChange={handleInputChange} required></TextInput>
                <TextInput type="text" name="email" placeholder="Enter Email" value={email} onChange={handleInputChange} required></TextInput>
                <TextInput type="password" name="password" placeholder="Enter Password" value={password} onChange={handleInputChange} required></TextInput>
                <TextInput type="password"  name="confirmPassword" placeholder="Enter Password" value={confirmPassword} onChange={handleInputChange} required></TextInput>


            <Button type="submit" variant="primary" >
                Sign Up
            </Button>
        </Form>
        <Row className="py-3">
            <Col>
                Already Register? <Link to="/login">Login</Link>
            </Col>
        </Row>
    </FormContainer>
    )
}
export default RegisterScreen;