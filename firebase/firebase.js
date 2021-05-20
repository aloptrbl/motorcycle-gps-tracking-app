import app from 'firebase/app';
import 'firebase/auth';
import firebase from 'firebase';
import 'firebase/database';
const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
};
class Firebase {
  constructor() {
    if (!firebase.apps.length) {
    app.initializeApp(config);
    }
    this.auth = app.auth();
    this.db = app.database();
    this.result = null;
  }

  // doCreateUserWithEmailAndPassword = (email, password) =>
  // this.auth.createUserWithEmailAndPassword(email, password);

  // doSignInWithEmailAndPassword = (email, password) =>
  // this.auth.signInWithEmailAndPassword(email, password);

  // doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  // doPasswordUpdate = password =>
  //   this.auth.currentUser.updatePassword(password);

    //login using number 
  doSignInWithPhoneNumber = (phoneNumber, appVerifier) =>
  this.auth.signInWithPhoneNumber(phoneNumber, appVerifier);
  

  //listen authentication change in firebase
  onAuthStateChanged = (onauthstatechanged) => 
  this.auth.onAuthStateChanged(onauthstatechanged);

  //listener phone authentication change in firebase
  doPhoneAuthProvider = () => firebase.auth.PhoneAuthProvider();

  //sign out
  doSignOut = () => this.auth.signOut();


      // *** User API ***
  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');
  history = () => this.db.ref('location/history');

  //create history location
  writeHistoryData = (location, coordinate, timestamp) => 
    this.db.ref('location/history').push().set({
      address: location,
      coordinate: coordinate,
      timestamp : timestamp
    });
  
    //refer raspberry pi location in firebase
    trackMotors = () => 
    this.db.ref('location/data');

  // get raspberry pi location in firebase
  trackMotor = () =>
  { this.db.ref('location/data').on('value', (snapshot) => {
  this.result = snapshot.val();
  }) 
return this.result;
};

  
  
}
export default Firebase;
