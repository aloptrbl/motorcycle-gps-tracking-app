import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, Image } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import Firebase, { FirebaseContext, withFirebase } from "../firebase";
import pick from "lodash.pick";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
const { width, height } = Dimensions.get("window");
import haversine from "haversine";

const ASPECT_RATIO = width / height;
console.disableYellowBox = true;
const TrackPage = ({ firebase }) => {
  const latlng = null;
  const longitude_delta = 0.0922 * ASPECT_RATIO;
  const [location, setLocation] = useState(null);
  const [trackLocation, settrackLocation] = useState(false);
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

  const _trackLocation = async () => {
    settrackLocation(!trackLocation);
    if (trackLocation) {
      alert("Your tracking in Off.");
      const {latitude, longitude} = deviceLocation;
      const location = await Location.reverseGeocodeAsync({
        latitude: latitude,
        longitude: longitude,
      });
      await firebase.writeHistoryData(
        location[0],
        deviceLocation,
        new Date().toLocaleString()
      );
      return () => {
        unsubscribe();
      };
    } else {
      alert("Your tracking is On.");

      var unsubscribe = await firebase.trackMotors().on("value", (snapshot) => {
        var { latitude, longitude } = snapshot.val();
        var newLatLng = {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        };
        const positionLatLngs = pick(newLatLng, ["latitude", "longitude"]);
        setrouteCoordinates(routeCoordinates.concat(positionLatLngs));
        setdistanceTravelled(distanceTravelled + calcDistance(newLatLng));
        setprevLatLng(newLatLng);
      });
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
      
      let location = await Location.getCurrentPositionAsync({});
      var pos = {
        latitude: parseFloat(location.coords.latitude),
        longitude: parseFloat(location.coords.longitude),
        // latitudeDelta: 0.0922,
        // longitudeDelta: 0.0922 * longitude_delta,
      };
      setLocation(pos); 
      setcurrentLocation(pos);

      //device location
      const unsubscribe = await firebase
        .trackMotors()
        .on("value", (snapshot) => {
          var { latitude, longitude } = snapshot.val();
          var newLatLng = {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          };
          setdeviceLocation(newLatLng);
        });

      // }
      return () => {
        unsubscribe();
      };
    })();
  }, [firebase]);

  function calcDistance(newLatLng) {
    return haversine(prevLatLng, newLatLng) || 0;
  }

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <MapView
      region={location}
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
          <Marker.Animated coordinate={deviceLocation}>
            <Image
              style={{ width: 50, height: 40 }}
              resizeMode={"contain"}
              source={{
                uri:
                  "https://www.freepngimg.com/download/motorcycle_helmet/10-2-motorcycle-helmet-free-png-image.png",
              }}
            />
          </Marker.Animated>
        ) : null}
        { currentLocation ? (
          <Marker.Animated coordinate={currentLocation}>
          <Image
              style={{ width: 50, height: 40 }}
              resizeMode={"contain"}
              source={{
                uri:
                  "https://images.vexels.com/media/users/3/157259/isolated/preview/7e7385df5b67d35bad5671b7fa0a9134-black-and-white-smartphone-icon-by-vexels.png",
              }}
            />
          </Marker.Animated>
        ) : null
      }
      </MapView>
      <View style={styles.distance}>
        <Text>{parseFloat(distanceTravelled).toFixed(2)} km</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          color="red"
          mode="contained"
          contentStyle={styles.buttons}
          style={styles.button}
          onPress={() => _trackLocation()}
        >
          <Text style={styles.buttonTitle}>
            {trackLocation ? "Stop" : "Start"}
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
  distance: {
    position: "absolute",
    bottom: 100,
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
    backgroundColor: "white",
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
