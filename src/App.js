import React from 'react';
import './App.css';
import {Redirect, Route} from 'react-router-dom';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./common/Preloader/Preloader";
import MessagesContainer from "./components/Dialogs/Messages/MessagesContainer";

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
                    <div className='app__header'>
                        <HeaderContainer/>
                    </div>
                    <div className='app__content'>
                        <div className='app__content__container'>
                            <Route exact path='/'
                                   render={() => <Redirect to={'/profile'}/>}/>
                            <Route path='/profile/:userId?'
                                   render={() => <ProfileContainer/>}/>
                            <Route exact path='/dialogs'
                                   render={() => <DialogsContainer />}/>
                            <Route path='/dialogs/:userId/messages'
                                   render={() => <MessagesContainer />}/>
                            <Route path='/users'
                                   render={() => <UsersContainer />}/>
                            <Route path='/login'
                                   render={() => <Login />}/>
                        </div>
                    </div>
                </div>
            )
        }
    }

}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
});

export default connect(mapStateToProps, {initializeApp})(App);
