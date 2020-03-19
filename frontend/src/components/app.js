import React from 'react';
import { AuthRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';

// import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container.js';
// import ProfileContainer from './profile/profile_container';
import GameShowContainer from './gameShow/game_show_container'

const App = () => (
    <div>
        <NavBarContainer />
        <Switch>
            <GameShowContainer />
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />
        </Switch>
    </div>
);

export default App;