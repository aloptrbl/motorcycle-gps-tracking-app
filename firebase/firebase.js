import app from 'firebase/app';
import 'firebase/auth';
import firebase from 'firebase';
import 'firebase/database';
const config = {
  apiKey: "AIzaSyCSLbCuHNAMKmUyqRreWESwjspdc80QHEI",
  authDomain: "gps-data-3575a.firebaseapp.com",
  databaseURL: "https://gps-data-3575a.firebaseio.com",
  projectId: "gps-data-3575a",
  storageBucket: "gps-data-3575a.appspot.com",
  messagingSenderId: "541694277968",
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

  trackMotors = () => 
    this.db.ref('location/data');
  // *** Auth API ***
  trackMotor = () =>
  { this.db.ref('location/data').on('value', (snapshot) => {
  this.result = snapshot.val();
  }) 
return this.result;
};

  doCreateUserWithEmailAndPassword = (email, password) =>
  this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
  this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithPhoneNumber = (phoneNumber, appVerifier) =>
  this.auth.signInWithPhoneNumber(phoneNumber, appVerifier);
  
  onAuthStateChanged = (onauthstatechanged) => 
  this.auth.onAuthStateChanged(onauthstatechanged);

  doPhoneAuthProvider = () => firebase.auth.PhoneAuthProvider();

  doSignOut = () => this.auth.signOut();

  alerttest = () => alert("test");

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

      // *** User API ***
  user = uid => this.db.ref(`users/${uid}`);
  driver = driver => this.db.ref(`drivers/${driver}`);
  users = () => this.db.ref('users');
  drivers = () => this.db.ref('drivers');

  writeUserData = (userId, name, platenumber, to_location, from_location) => 
    this.db.ref('drivers').push().set({
      device_id: userId,
      driver_name: name,
      plate_number : platenumber,
      to_location: to_location,
      from_location: from_location
    });

    updateUserData = (uid, deviceid, name, platenumber, to_location, from_location) => 
    this.db.ref('drivers/' + uid).set({
      device_id: deviceid,
      driver_name: name,
      plate_number : platenumber,
      to_location: to_location,
      from_location: from_location
    });
  
}
export default Firebase;
