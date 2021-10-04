import {Navbar,Container ,NavDropdown, Nav } from "react-bootstrap";
import {FaShoppingCart , FaUser} from "react-icons/fa";

import {LinkContainer} from 'react-router-bootstrap';
import {useDispatch , useSelector}  from 'react-redux';
import {logout} from '../actions/userActions';
const Header = () => {
  const dispatch = useDispatch();
  const userLogin  = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;
  const logoutHandler =(e) => {
 e.preventDefault();
dispatch(logout());
}
    return (
        <header>
            <Navbar bg="dark" variant="dark"  expand="lg" collapseOnSelect>
  <Container>
  <LinkContainer to="/">
  <Navbar.Brand>JuicyShop</Navbar.Brand>

  </LinkContainer>

    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">


      <LinkContainer to="/cart">
        <Nav.Link><FaShoppingCart/>  Cart</Nav.Link>
        </LinkContainer>





{userInfo ?  (
  <NavDropdown title={userInfo.name} id="username">
  <LinkContainer to="/cart">
<NavDropdown.Item>Profile</NavDropdown.Item>
       </LinkContainer>
       <LinkContainer to="/cart">
<NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
       </LinkContainer>
  </NavDropdown>
): (
  <LinkContainer to="/login">
<Nav.Link>
<FaUser/>

Sign In</Nav.Link>
       </LinkContainer>
)}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
        </header>
    )
}

export default Header
