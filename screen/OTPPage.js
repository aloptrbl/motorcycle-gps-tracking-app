import React, {useRef, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import {Text, TextInput, Button} from 'react-native-paper';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import * as firebases from 'firebase';
import Firebase, { FirebaseContext } from '../firebase';
const OTPPage = (route, navigation) => {
const [otpNumber, setotpNumber] = useState("");
const [disabled, setDisabled] = useState(true);
const next = async () => {
  try {
    const credential = firebases.auth.PhoneAuthProvider.credential(
      route.route.params.verificationId,
      otpNumber
    );
    await firebases.auth().signInWithCredential(credential);
    alert("Phone authentication successful");
  } catch (err) {
    alert(err);
  }
};
  return (
    <View style={styles.container}>
      <Text style={styles.header} theme={{fonts: 'medium'}}>MOTORCYCLE
      GPS
      TRACKER</Text>
    <Text>We send OTP code to verify your number</Text>
    <OTPInputView
    style={{width: '80%', height: 200}}
    pinCount={6}
    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
    autoFocusOnLoad
    codeInputFieldStyle={styles.underlineStyleBase}
    codeInputHighlightStyle={styles.underlineStyleHighLighted}
    onCodeFilled = {(code => {
        setotpNumber(code);
        setDisabled(false);
    })}
/>
       <Button color="black" disabled={disabled}  mode="contained" onPress={() => next()}>
    Next
  </Button>
    </View>
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
    margin: 25
  },
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});

export default OTPPage;
