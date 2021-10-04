import  {useState , useEffect} from 'react';

import {Link} from 'react-router-dom';
import {Form,Row,Col} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import {login} from '../actions/userActions.js';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message'
import Loader from '../components/Loader';
import TextInput from '../UI/TextInput';
import Button from '../UI/Button';


const LoginScreen = ({location , history}) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const redirect = location.search ? location.search.split('=')[1]: '/'
const dispatch = useDispatch();
const userLogin = useSelector(state => state.userLogin);
const {loading  ,error , userInfo}  = userLogin;
const submitHandler = (e) => {
    e.preventDefault();
    if(email==="" || password==="") {
        alert('Please fill the required fields');
    }



else {
    console.log('Event fired');
    dispatch(login({
        email:email,
        password:password,
    }))
}

}

const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
}
const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
}

useEffect(() => {
    if(userInfo) {
        history.push(redirect);
    }
},[history,userInfo,redirect])

    return (
    <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit ={submitHandler}>
                <TextInput type="email" placeholder="Enter Email" value={email} onChange={handleEmail}/>
            
                <TextInput type="password" placeholder="Enter Password" value={password} onChange={handlePassword}/>

            <Button type="submit" variant="primary">
                Sign In
            </Button>
        </Form>
        <Row className="py-3">
            <Col>
                New Customer ? <Link to={redirect ? `/register?redirect=${redirect}`: '/register'}>Register</Link>
            </Col>
        </Row>
    </FormContainer>
    )
}
export default LoginScreen;