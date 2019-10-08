import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import {BrowserRouter,Route} from 'react-router-dom';




const App = () => {
  return (
    <BrowserRouter>
    <div className='app-wrapper'>
      <Header/>
      <Navbar/>
      <div class='app-wrapper-content'>
        <Route component={Profile} path='/Profile' />
        <Route component={Dialogs} path='/Dialogs' />
        <Route component={News} path='/News' />
        <Route component={Music} path='/Music' />
        <Route component={Settings} path='/Settings' />

      </div>
      

    </div>
    </BrowserRouter>
  )
}





export default App;
