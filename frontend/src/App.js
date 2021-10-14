
import Header from './components/Header';
import Footer from './components/Footer';
import {Container} from 'react-bootstrap';
import {Suspense, lazy} from 'react';
import Loader from './components/Loader.js';

import {BrowserRouter as Router , Route} from 'react-router-dom';
const HomeScreen = lazy(() => import(/* webpackChunkName:"Home" */  './screens/HomeScreen.js'));
const ProductScreen = lazy(() => import(/* webpackChunkName:"Product"  */     './screens/ProductScreen.js'));
const Cartscreen = lazy(() => import( /* webpackChunkName:"Cart" */ './screens/CartScreen.js'));
const LoginScreen = lazy(() => import(/* webpackChunkName:"Login" */   './screens/LoginScreen.js'));
const RegisterScreen = lazy(() => import(/* webpackChunkName:"Register" */ './screens/RegisterScreen.js'));
const ProfileScreen = lazy(() => import(/* webpackChunkName:"ProfileScreen" */ './screens/ProfileScreen.js'));
const ShippingScreen = lazy(() => import(/* webpackChunkName:"Shipping" */ './screens/ShippingScreen.js'));
const PaymentScreen = lazy(() => import(/* webpackChunkName:"PaymentScreen" */ './screens/PaymentScreen.js'));
const PlaceOrderScreen = lazy(() => import(/* webpackChunkName:"PlaceOrderScreen" */ './screens/PlaceOrderScreen.js'));
const OrderScreen = lazy(() => import(/* webpackChunkName:"OrderScreen" */ './screens/OrderScreen.js'));
const UserListScreen = lazy(() => import(/* webpackChunkName:"UserListScreen" */ './screens/UserListScreen.js'));
const UserEditScreen = lazy(() => import(/* webpackChunkName:"UserEditScreen" */ './screens/UserEditScreen.js'));


function App() {
  return (
 <Router>
 <Header/>
 <main className="py-3">
 <Container>
 <Suspense fallback={<Loader/>}>
   <Route path="/" component={HomeScreen} exact />
   <Route path="/product/:id" component={ProductScreen}/>
   <Route path="/cart/:id?" component={Cartscreen}/>
   <Route path="/login" component={LoginScreen}/>
   <Route path="/register" component={RegisterScreen}/>
   <Route path="/profile" component={ProfileScreen}/>
   <Route path="/shipping" component={ShippingScreen}/>
   <Route path="/payment" component={PaymentScreen}/>
   <Route path="/placeorder" component={PlaceOrderScreen}/>
   <Route path="/order/:id" component={OrderScreen}/>
   <Route path="/admin/userList" component={UserListScreen}/>
   <Route path="/admin/user/:id/edit" component={UserEditScreen}/>



   </Suspense>

   </Container>
 </main>
 <Footer/>
 </Router>
  );
}

export default App;
