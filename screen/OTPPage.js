import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Text, TextInput, Button} from 'react-native-paper';
import OTPTextView from 'react-native-otp-textinput';
const OTPPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header} theme={{fonts: 'medium'}}>MOTORCYCLE
      GPS
      TRACKER</Text>
    <Text>We send OTP code to verify your number</Text>
    <OTPTextView
          handleTextChange={(e) => {}}
          containerStyle={styles.textInputContainer}
          textInputStyle={styles.roundedTextInput}
          defaultValue=""
        />
       <Button color="black" mode="contained" onPress={() => console.log('Pressed')}>
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
  textInputContainer: {
    marginTop: 25,
    marginBottom: 25,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 4,
  },
});

export default OTPPage;
