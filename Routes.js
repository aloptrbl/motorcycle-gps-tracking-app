import React, { useContext, useState, useEffect, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import { AuthContext } from './AuthProvider';
import { withFirebase } from './firebase';

class Routes extends Component {
    constructor(props) {
        super(props);
     
        this.state = {
          authUser: null,
        };
      }
     
      componentDidMount() {
        this.props.firebase.auth.onAuthStateChanged(authUser => {
          authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null });
        });
      }
render() {
  return (
    <NavigationContainer>
      {this.state.authUser ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
}

export default withFirebase(Routes);