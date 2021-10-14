import  {useState , useEffect} from 'react';

import {Link} from 'react-router-dom';
import {Form} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import {getUserDetails} from '../redux/actions/userActions.js';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message'
import Loader from '../components/Loader';
import TextInput from '../UI/TextInput';
import Button from '../UI/Button';
import useForm from '../hooks/useForm';


const UserEditScreen = ({match , history}) => {
  const userId = match.params.id;
    const {formData, setFormData, handleInputChange} = useForm({
        name:'',
        email:'',
isAdmin:false,
    })
    const {name,email} = formData;
    const [message,setMessage] = useState(null);
    const [isAdmin,setIsAdmin] = useState(false);
const dispatch = useDispatch();
const userDetails = useSelector(state => state.userDetails);
const {loading  ,error , user}  = userDetails;

useEffect(() => {
 if(!user.name || user._id !== userId) {
   dispatch(getUserDetails(userId))
 }
 else {
  formData.name = user.name;
  formData.email = user.email;
 }
},[user,userId,formData, dispatch])
const submitHandler = (e) => {
  e.preventDefault();
}    

    return (
      <>
      <Link to='/admin/userList' className='btn btn-light my-3'>
        Go Back
      </Link>
    <FormContainer>
        <h1>Edit User Up</h1>
        {message && <Message variant="danger">{message}</Message>}

        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
                <TextInput type="text" name="name" placeholder="Enter Name" value={name} onChange={handleInputChange} required></TextInput>
                <TextInput type="text" name="email" placeholder="Enter Email" value={email} onChange={handleInputChange} required></TextInput>

                <Form.Group><Form.Check type="checkbox" label="Is Admin" name="isAdmin" value={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}>
                  
                </Form.Check>
                </Form.Group>


            <Button type="submit" variant="primary" >
                Edit User
            </Button>
        </Form>
       
    </FormContainer>
    </>
    )
}
export default UserEditScreen;