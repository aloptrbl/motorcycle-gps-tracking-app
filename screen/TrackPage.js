import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import Firebase, { FirebaseContext, withFirebase } from "../firebase";
import pick from "lodash.pick";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
const { width, height } = Dimensions.get("window");
const firebase = new Firebase();
import haversine from "haversine";
const ASPECT_RATIO = width / height;
const TrackPage = ({firebase}) => {
  const latlng = null;
  const longitude_delta = 0.0922 * ASPECT_RATIO;
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentLocation, setcurrentLocation] = useState({
    latitude: 3.019481,
    longitude: 101.787018,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0922 * longitude_delta,
  });
  const [routeCoordinates, setrouteCoordinates] = useState([]);
  const [distanceTravelled, setdistanceTravelled] = useState(0);
  const [prevLatLng, setprevLatLng] = useState({});
  const [deviceLocation, setdeviceLocation] = useState(null);


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      const unsubscribe = await firebase.trackMotors().on('value', (snapshot) => {
        var { latitude, longitude } = snapshot.val();
        var newLatLng = {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude)
        };
        const positionLatLngs = pick(newLatLng, ["latitude", "longitude"]);
        setrouteCoordinates(routeCoordinates.concat(positionLatLngs));
        setdistanceTravelled(distanceTravelled + calcDistance(newLatLng));
        setprevLatLng(newLatLng);
        setdeviceLocation(newLatLng);
        });


      // }
      return () => {
        unsubscribe()
      }
    })();
  },[firebase]);

  function calcDistance(newLatLng) {
    return haversine(prevLatLng, newLatLng) || 0;
  }

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    var pos = {
      latitude: parseFloat(location.coords.latitude),
      longitude: parseFloat(location.coords.longitude),
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0922 * longitude_delta,
    };
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Track Location</Text>
        <Text>{parseFloat(distanceTravelled).toFixed(2)} km</Text>
      </View>
      <MapView
        initialRegion={currentLocation}
        overlays={[
          {
            coordinates: routeCoordinates,
            strokeColor: "#19B5FE",
            lineWidth: 10,
          },
        ]}
        style={styles.mapStyle}
      >
        {deviceLocation ? (
          <Marker.Animated coordinate={deviceLocation} />
        ) : null}
      </MapView>
      <View style={styles.buttonContainer}>
        <Button
          color="red"
          mode="contained"
          contentStyle={styles.buttons}
          style={styles.button}
        >
          <Text style={styles.buttonTitle}>
            STOP TRACKING {JSON.stringify(deviceLocation)}
          </Text>
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
    position: "absolute",
    bottom: 0,
  },
  buttons: {
    height: "100%",
    fontSize: 24,
  },
  buttonTitle: {
    fontSize: 20,
    color: "white",
  },
});

export default withFirebase(TrackPage);
