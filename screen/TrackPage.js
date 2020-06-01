import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import MapView from "react-native-maps";
const TrackPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Track Location</Text>
      </View>
      <MapView style={styles.mapStyle} />
      <View style={styles.buttonContainer}>
        <Button
          color="red"
          mode="contained"
          contentStyle={styles.buttons}
          style={styles.button}
          onPress={() => console.log("Pressed")}
        >
          <Text style={styles.buttonTitle}>STOP TRACKING</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  header: {
    width: Dimensions.get("window").width,
    paddingTop: 55,
    height: 95,
    backgroundColor: "#0275d8",
  },
  headerTitle: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  buttonContainer: {
    width: Dimensions.get("window").width,
    height: 95,
    position: 'absolute',
    bottom: 0
  },
  buttons: {
      height: '100%',
      fontSize: 24
  }, 
  buttonTitle: {
      fontSize: 20,
      color: 'white'
  }
});

export default TrackPage;
