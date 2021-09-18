import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import {Container} from 'react-bootstrap';
import {Suspense, lazy} from 'react';
import Loader from './components/Loader.js';

import {BrowserRouter as Router , Route} from 'react-router-dom';
const HomeScreen = lazy(() => import('./screens/HomeScreen.js'));
const ProductScreen = lazy(() => import('./screens/ProductScreen.js'));
function App() {
  return (
 <Router>
 <Header/>
 <main className="py-3">
 <Container>
 <Suspense fallback={<Loader/>}>
   <Route path="/" component={HomeScreen} exact />
   <Route path="/product/:id" component={ProductScreen}/>
   </Suspense>

   </Container>
 </main>
 <Footer/>
 </Router>
  );
}

export default App;
