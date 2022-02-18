import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, Circle } from "react-native-maps";
import { getDistance } from "geolib";
import alarm from '../../../images/alarm.png'
import demloc from '../../../images/demloc.png'
import {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import axios from "axios";

const CheckMyDemantiasLocation = () => {
  const[Danger, setDanger] = useState(false);
  const [safe, setSafeArea] = useState({
    latitude: 36.7399988,
    longitude: 10.2324613,
  });
  const [location, setLocation] = useState(null);
  function goToLocation(latitude, longitude) {
    mapRef.current.animateToRegion({
      latitude: latitude,
      longitude: longitude,
    
    });
  }

  const mapRef = useRef();

  function getDemantiaLocation() {
    axios
      .get(
        `http://192.168.1.60:8090/guardian/getMyDemantiaLocation/4028b8817f092fe7017f093140e80000`
      )
      .then((res) => {
        setLocation(res.data);
        goToLocation(res.data.latitude, res.data.longitude);
        console.log(res.data);
        console.log("el distance between them");
        if (
            getDistance(
                { latitude: res.data.latitude, longitude: res.data.longitude },
                safe
              ) > 300
        ) {
            console.log("DAAANGER")
            
          setDanger(true);
        } else {
            console.log("saaaaafe")
          setDanger(false);
        }
        console.log(
          getDistance(
            { latitude: res.data.latitude, longitude: res.data.longitude },
            safe
          )
        );
      })
      .catch((err) => console.log("ell error" + err));
  }

  useEffect(() => {
      console.log("is it rexecuting ?")
    getDemantiaLocation();

    const interval = setInterval(() => {
      getDemantiaLocation();
      console.log("seconds 10 getting");
    }, 10000);
  }, []);

  if (location == null) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <MapView
       
          style={styles.map}
          ref={mapRef}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.004,
            longitudeDelta: 0.005,
          }}
        >
          <Circle
            strokeColor="red"
            strokeWidth={4}
            fillColor="rgba(90, 162, 124, 0.2)"
            center={safe}
            radius={300}
          />
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={"title"}
            description={"marker.description"}
          ><Image
          source={Danger?alarm:demloc}
          style={{width: 26, height: 28}}
          resizeMode="contain"
        /></Marker>
          <View style={{backgroundColor:''}}>
           {Danger?<Text
              style={{
                  fontSize:25,
                borderColor: "red",
                backgroundColor:'rgba(255, 0, 0, 0.2)',
                color: "red",
                textAlign: "center",
              }}
            >
              Danger
            </Text >:<Text style={{
                position: "absolute",
                borderColor: "green",
                fontSize:25,
                color: "green",
                textAlign: "center",
              }}>
Safe
            </Text>}
          </View>
        </MapView>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
export default CheckMyDemantiasLocation;
