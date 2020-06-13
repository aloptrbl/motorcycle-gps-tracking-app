import React from 'react';


//function
const FirebaseContext = React.createContext(null);


//class
export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
      {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
  );
export default FirebaseContext;