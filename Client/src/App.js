import Topbar from './components/topbar/Topbar.js';
import Home from './components/home/Home.js';
import Write from './singlePage/Write.js';
import UserInfo from './singlePage/UserInfo.js';
import Login from './singlePage/Login.js';
import Register from './singlePage/Register.js';
import SinglePost from './singlePage/SinglePost.js';
import {useContext} from 'react';
import {Context} from './context/Context.js'

import {
  BrowserRouter as Router,
  Switch,
  Route} from "react-router-dom";

function App() {
  const {user} = useContext(Context);
  return (
    <Router>
      <Topbar/>
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/register">
            {user? <Home/> : <Register/>}
          </Route>
          <Route path="/login">
            {user? <Home/> : <Login/>}
          </Route>
          <Route path="/write">
            {user ? <Write/> : <Login/>}
          </Route>
          <Route path="/userinfo">
            {user ? <UserInfo/> : <Login/>}
          </Route>
          <Route path="/singlepost">
            {user ? <SinglePost/> : <Login/>}
          </Route>
          
        </Switch>
    </Router>
  );
}

export default App;
