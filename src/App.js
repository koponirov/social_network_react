import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import {Redirect, Route} from 'react-router-dom';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./common/Preloader/Preloader";
import MessagesContainer from "./components/Dialogs/Message/MessagesContainer";

class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {

        if (!this.props.initialized) {
            return <Preloader/>
        } else {

            return (

                <div className='app'>
                    <HeaderContainer/>
                    <div className='app__content'>
                        <div className='app__content__container'>
                            <Route exact path='/'
                                   render={() => <Redirect to={'/profile'}/>}/>
                            <Route path='/profile/:userId?'
                                   render={() => <ProfileContainer/>}/>
                            <Route exact path='/dialogs'
                                   render={() => <DialogsContainer store={this.props.store}/>}/>
                            <Route path='/dialogs/:userId/messages'
                                   render={() => <MessagesContainer store={this.props.store}/>}/>
                            <Route path='/users'
                                   render={() => <UsersContainer store={this.props.store}/>}/>
                            <Route path='/news' component={News}/>
                            <Route path='/music' component={Music}/>
                            <Route path='/settings' component={Settings}/>
                            <Route path='/login'
                                   render={() => <Login store={this.props.store}/>}/>
                        </div>
                    </div>
                </div>

            )
        }
    }

}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default connect(mapStateToProps, {initializeApp})(App);
