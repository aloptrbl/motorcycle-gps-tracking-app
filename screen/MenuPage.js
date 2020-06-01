import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import OTPTextView from "react-native-otp-textinput";
const MenuPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header} theme={{ fonts: "medium" }}>
        MOTORCYCLE
        GPS 
        TRACKER
      </Text>
      <Text>Track and Monitor Motorcycle Location</Text>
      <View style={styles.buttonContainer}>
        <Button
          color="#0070c6"
          mode="contained"
          style={styles.button}
          onPress={() => console.log("Pressed")}
        >
          Track Location
        </Button>
        <Button
          color="#0070c6"
          mode="contained"
          style={styles.button}
          onPress={() => console.log("Pressed")}
        >
          Location History
        </Button>
      </View>
      <View style={styles.logoutContainer}>
      <Button
          color="gray"
          dark
          mode="contained"
          style={styles.button}
          onPress={() => console.log("Pressed")}
        >
          Log Out
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#85b2e1",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    marginBottom: 45,
    textAlign: "center",
    fontWeight: "bold",
  },
  textInput: {
    margin: 25,
  },
  textInputContainer: {
    marginTop: 25,
    marginBottom: 25,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 4,
  },
  buttonContainer: {
      margin: 45,
  },
  button: {
      marginBottom: 15
  },
  logoutContainer: {
position: 'absolute',
top: 0,
right: 0,
marginRight: 10,
marginTop: 10
  }
});

export default MenuPage;
