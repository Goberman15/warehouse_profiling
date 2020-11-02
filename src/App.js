import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Form from './components/Form.jsx';
import Navbar from './components/Navbar.jsx';
import CartList from './components/CartList.jsx';
import ItemList from './components/ItemList.jsx';
import XForm from './components/xForm.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Switch>
          <Route exact path="/" component={CartList}/>
          <Route path="/input" component={Form}/>
          <Route path="/list-item/:id" component={ItemList}/>
          <Route path="/try" component={XForm} />
        </Switch>

      </Router>
    </div>
  );
}

export default App;
