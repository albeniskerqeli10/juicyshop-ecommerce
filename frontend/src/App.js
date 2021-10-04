import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import {Container} from 'react-bootstrap';
import {Suspense, lazy} from 'react';
import Loader from './components/Loader.js';

import {BrowserRouter as Router , Route} from 'react-router-dom';
const HomeScreen = lazy(() => import(/* webpackChunkName:"Home" */  './screens/HomeScreen.js'));
const ProductScreen = lazy(() => import(/* webpackChunkName:"Product" */     './screens/ProductScreen.js'));
const Cartscreen = lazy(() => import( /* webpackChunkName:"Cart" */ './screens/CartScreen.js'));
const LoginScreen = lazy(() => import(/* webpackChunkName:"Login" */   './screens/LoginScreen.js'));
const RegisterScreen = lazy(() => import(/* webpackChunkName:"Register" */ ' ./screens/RegisterScreen.js'));

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

   </Suspense>

   </Container>
 </main>
 <Footer/>
 </Router>
  );
}

export default App;
