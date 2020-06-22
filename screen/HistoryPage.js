import React from "react";
import { StyleSheet, View, Dimensions, FlatList } from "react-native";
import Firebase, { FirebaseContext, withFirebase } from "../firebase";
import { Text, TextInput, Button } from "react-native-paper";
import MapView from "react-native-maps";
import { useEffect, useState } from "react";
import moment from 'moment';
const HistoryPage = ({firebase}) => {
  const [locationHistoryList, setLocationHistoryList] = useState(null);
  useEffect(() => {
    firebase.history().on('value', snapshot => {
    const historyObj = snapshot.val();
    const historyList = Object.keys(historyObj).map(key => ({
    ...historyObj[key],
    uid: key, 
    }));
    setLocationHistoryList(historyList);
    })
    },[firebase]);
  return (
    <View style={styles.container}>
      <FlatList
      data={locationHistoryList}
      renderItem={(rowData) => 
        <View style={styles.locationItem}>
      <Text style={styles.locationItemDate}>{moment(rowData.item.timestamp).format("MMMM Do YY, h:mm a")}</Text>
      <Text style={styles.locationAddress}>{rowData.item.address.name}, {rowData.item.address.street}, {rowData.item.address.city}, {rowData.item.address.country}</Text>    
      </View>
      }
      keyExtractor={item => item.uid}
      />
      
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

export default withFirebase(HistoryPage);
