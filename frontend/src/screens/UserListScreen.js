
import {useSelector,useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {listUsers , deleteUser} from '../redux/actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {Table} from 'react-bootstrap';
import {FaCheck  , FaTimes , FaEdit , FaTrash} from 'react-icons/fa';
import Button from '../UI/Button';
import {LinkContainer} from 'react-router-bootstrap';
const UserListScreen = ({history}) => {
const dispatch = useDispatch();
const userList = useSelector(state => state.userList);
const userLogin  = useSelector(state => state.userLogin); 
const userDelete = useSelector(state => state.userDelete);
const {success:successDelete} =  userDelete;
const {userInfo} = userLogin;
const {loading,users,error} = userList;
useEffect(() => {
  if(userInfo && userInfo.isAdmin) {
  dispatch(listUsers()); 
  }
  else {
    history.push('/login');
  }
}, [dispatch , history,userInfo , successDelete])

const deleteHandler = (id) => {

if(window.confirm('Are you sure')) {
  dispatch(deleteUser(id));

}


}


  return (
   loading? <Loader/> : error? <Message variant="danger">{error}</Message> : users? <Table striped  bordered  hover responsive className="table-sm">
     <thead>
       <tr>
         <th>ID</th>
         <th>Name</th>
         <th>Email</th>
         <th>Admin</th>
<th>Actions</th>
       </tr>
     </thead>
     <tbody>
       {users.map(user => (
         <tr key={user._id}>
           <td>{user._id}</td>
           <td>{user.name}</td>
           <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
           <td>{user.isAdmin ? (<FaCheck style={{color:"green"}}/>) : <FaTimes style={{color:"red"}}/>}</td>
           <td>
             <LinkContainer to={`/admin/user/${user._id}/edit`}>
<Button variant='light' className='btn-sm'>
  <FaEdit/>
</Button>
             </LinkContainer>
             <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
               <FaTrash/>
             </Button>
           </td>
         </tr>
       ))}
     </tbody>
   </Table>
  : 'Searching for Users')
}

export default UserListScreen
