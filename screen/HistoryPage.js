import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import MapView from "react-native-maps";
const HistoryPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Location History</Text>
      </View>
      <View style={styles.locationItem}>
      <Text style={styles.locationItemDate}>10 Dis 2019 10:03AM</Text>
      <Text style={styles.locationAddress}>JALAN INTELEK, 76100 DURIAN TUNGGAL MELAKA</Text>    
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#85b2e1",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  header: {
    width: Dimensions.get("window").width,
    paddingTop: 35,
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
  },
  locationItem: {
      backgroundColor: '#D3D3D3',
      padding: 15
  },
  locationItemDate: {
      textAlign: 'right'
  },
  locationAddress: {
      paddingRight: 35
  }
});

export default HistoryPage;
