import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import {Text, Button} from 'react-native-paper';
import * as firebases from 'firebase';
import Firebase, { FirebaseContext } from '../firebase';

const MainPage = ({navigation}) => {
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const config = {
    apiKey: "AIzaSyCSLbCuHNAMKmUyqRreWESwjspdc80QHEI",
    authDomain: "gps-data-3575a.firebaseapp.com",
    databaseURL: "https://gps-data-3575a.firebaseio.com",
    projectId: "gps-data-3575a",
    storageBucket: "gps-data-3575a.appspot.com",
    messagingSenderId: "541694277968",
  };

  return (
    <FirebaseContext.Consumer>
    { firebase => (
    <View style={styles.container}>
    
     <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={config}
      />
      <Text style={styles.header} theme={{fonts: 'medium'}}>MOTORCYCLE
      GPS
      TRACKER</Text>
    <Text>Enter Mobile Number & Login</Text>
    <View>
    <TextInput 
    placeholder="Mobile No"
    autoFocus
    onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
    style={styles.textInput}
    />
    </View>
       <Button color="black" mode="contained" disabled={!phoneNumber} onPress={async () => {
          try {
            //recaptcha verification
            const phoneProvider = new firebases.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
              phoneNumber,
              recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            alert( "Verification code has been sent to your phone.");
            //Send credential recaptcha if successful 
            navigation.navigate("OTPPage", {verificationId: verificationId});
          } catch (err) {
            alert(err);
          }
        }}>
       Send Verification Code
  </Button>

  {/* <View>
  <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        editable={!!verificationId}
        placeholder="123456"
        onChangeText={setVerificationCode}
      />
      <Button
        title="Confirm Verification Code"
        disabled={!verificationId}
        onPress={async () => {
          try {
            const credential = firebases.auth.PhoneAuthProvider.credential(
              verificationId,
              verificationCode
            );
            await firebases.auth().signInWithCredential(credential);
            alert("Phone authentication successful");
          } catch (err) {
            alert(err);
          }
        }}
      />
      <Button color="black" onPress={() => {navigation.navigate("OTPPage", {
            itemId: 86,
            otherParam: 'anything you want here',
          });}} backgroundColor="pink">Go To OTP Page</Button>
  </View> */}
    </View>
    )}
  </FirebaseContext.Consumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#85b2e1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 45,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  textInput: {
    margin: 25,
    height: 40,
    width: 200,
    paddingRight: 5,
    backgroundColor: 'white'
  }
});

export default MainPage;
