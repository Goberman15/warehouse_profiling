import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from'react-toastify';
import Form from './components/Form.jsx';
import Navbar from './components/Navbar.jsx';
import Landing from './components/Landing.jsx';
import CartList from './components/CartList.jsx';
import ItemList from './components/ItemList.jsx';
import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const cartId = useSelector(state => state.cartId);
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <ToastContainer 
          autoClose={4000}
          position="top-right"
          hideProgressBar={true}
        />

        <Switch>
          <Route exact path="/">
            {isLoggedIn ? <Redirect to="/inquiries" /> : <Landing />}  
          </Route>
          <Route path="/inquiries">
            {!isLoggedIn ? <Redirect to="/" /> : <CartList />}
          </Route>
          <Route path="/input">
            {!cartId
             ? <Redirect to="/inquiries"/>
             : !isLoggedIn
             ? <Redirect to="/" />
             : <Form />}
          </Route>
          <Route path="/list-item/:id">
            {!isLoggedIn ? <Redirect to="/" /> : <ItemList />}
          </Route>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
