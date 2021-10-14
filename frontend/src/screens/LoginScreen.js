import  {useState , useEffect} from 'react';

import {Link} from 'react-router-dom';
import {Form,Row,Col} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import {login} from '../redux/actions/userActions.js';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message'
import Loader from '../components/Loader';
import TextInput from '../UI/TextInput';
import Button from '../UI/Button';
import useForm from '../hooks/useForm';
// useForm
const LoginScreen = ({location , history}) => {

    const {formData, handleInputChange} = useForm({
        email:'',
        password:''
    })
    const {email,password} = formData;
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
                <TextInput type="email"  name="email" placeholder="Enter Email" value={email} onChange={handleInputChange}/>
            
                <TextInput type="password" name="password" placeholder="Enter Password" value={password} onChange={handleInputChange}/>

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