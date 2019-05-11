import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/navbar'
import Dashboard from './components/dashboard/Dashboard'
import PostDetails from './components/posts/PostDetails'
import SignIn from './components/authentication/SignIn'
import SignUp from './components/authentication/SignUp'
import CreatePost from './components/posts/CreatePost'
import Profile from './components/user/Profile'
import ProfileImage from './components/ImageUpload/ProfileImage'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/post/:id' component={PostDetails} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/create' component={CreatePost} />
            <Route path='/profile' component={Profile} />
            <Route path='/profileImage' component={ProfileImage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
