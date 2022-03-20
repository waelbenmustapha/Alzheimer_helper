import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, Circle } from "react-native-maps";
import { getDistance } from "geolib";
import {URL} from "@env"

import alarm from '../../../images/alarm.png'
import demloc from '../../../images/demloc.png'
import {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import * as Location from "expo-location";
import axios from "axios";

const CheckMyDemantiasLocation = () => {
  const[Danger, setDanger] = useState(false);
  const [safe, setSafeArea] = useState({
    latitude: 36.760228,
    longitude: 10.270014,
  });
  const [location, setLocation] = useState(null);
  function goToLocation() {
    mapRef.current.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.004,
      longitudeDelta: 0.005,
    });
  }

  const mapRef = useRef();

  async function getDemantiaLocation() {
   await axios
      .get(
        `http://192.168.1.26:8090/guardian/getMyDementiaLocation/4028b8817f6de1ee017f6de49c3d0000`
      )
      .then((res) => {
        setLocation(res.data);
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
    }, 15000);
    return () => {
      console.log("Cleaning useEffect")
      clearInterval(interval);

  }    
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
            </Text>:<Text style={{
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
        <TouchableOpacity style={{backgroundColor:'blue',padding:10}}  onPress={()=>goToLocation()}><Text style={{color:"white"}} >Go to location</Text></TouchableOpacity>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position:'relative',
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
