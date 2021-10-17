import  {useState , useEffect} from 'react';

import {Link} from 'react-router-dom';
import {Form} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import {getUserDetails , updateUser} from '../redux/actions/userActions.js';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message'
import Loader from '../components/Loader';
import TextInput from '../UI/TextInput';
import Button from '../UI/Button';


const UserEditScreen = ({match , history}) => {
  const userId = match.params.id;


const [name,setName] = useState('');
const [email,setEmail] = useState('');
    const [message] = useState(null);
    const [isAdmin,setIsAdmin] = useState(false);
const dispatch = useDispatch();
const userDetails = useSelector(state => state.userDetails);
const userUpdate = useSelector(state => state.userUpdate);
const {success:successUpdate}  = userUpdate;

const {loading  ,error , user}  = userDetails;

useEffect(() => {
  if(successUpdate) {
    history.push('/admin/userlist');
  }
 if(!user.name || user._id !== userId) {
   dispatch(getUserDetails(userId))
 }
 else {
  setEmail(user.email);
  setName(user.name);
  setIsAdmin(user.isAdmin);
 }
},[user,userId, history ,successUpdate,dispatch])
const submitHandler = (e) => {
  e.preventDefault();
  dispatch(updateUser({
    _id:userId,
    name,
    email,
    isAdmin,
  }))    
}    

    return (
      <>
      <Link to='/admin/userList' className='btn btn-light my-3'>
        Go Back
      </Link>
    <FormContainer>
        <h1>Edit User </h1>
        {message && <Message variant="danger">{message}</Message>}

        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
                <TextInput type="text" name="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} required></TextInput>
                <TextInput type="email" name="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required></TextInput>

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