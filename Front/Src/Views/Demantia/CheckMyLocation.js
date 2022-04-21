import React, { useEffect, useState } from "react";
import MapView, { Marker, Circle } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import { URL } from "@env";

import AsyncStorage from "@react-native-async-storage/async-storage";

const CheckMyLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userData, setuserData] = useState(null);
  const [intervalName,setIntervalName]=useState(null);
const [safeArea,setSafeArea]=useState(null);

  async function getsafearea(){
    AsyncStorage.getItem('user')
     .then(value=>
  {
    axios
     .get(
       `https://alzhelper.herokuapp.com/dementia/get-safezones/${JSON.parse(value).id}`
     ).then(res=> {
 console.log("el result is")
 console.log(res.data.filter(safe =>safe.active==true)[0]);
 setSafeArea(res.data.filter(safe =>safe.active==true)[0])  
  
 
     // setSafeArea()  
   }
   )}
   )}



  function postLocation(latitude, longitude,value) {
    console.log("**********************************");
    console.log(latitude + "and " + longitude),
      console.log("**********************************");
    axios
      .post(
        `https://alzhelper.herokuapp.com/dementia/post-location/${
          value
        }/${latitude.toFixed(7)}/${longitude.toFixed(7)}`
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log("ell error" + err));
  }

  function getlocation(value) {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      postLocation(location.coords.latitude, location.coords.longitude,value);
      setLocation(location);
    })();
  }
  let interval;

  useEffect(() => {
    getsafearea();
    AsyncStorage.getItem("user").then((value) => {
      setuserData(JSON.parse(value));
      getlocation(JSON.parse(value).id);

       interval = setInterval(() => {
        getlocation(JSON.parse(value).id);
        console.log("seconds 15");
      }, 15000);
      console.log("el interval is"+interval)


    });

    return () => {
      console.log("Cleaning useEffect");
      clearInterval(interval);
    };
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
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
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.004,
            longitudeDelta: 0.005,
          }}
        >
          {safeArea&&<Circle
            strokeColor="red"
            strokeWidth={4}
            fillColor="rgba(90, 162, 124, 0.2)"
            center={{ latitude: safeArea.latitude, longitude: safeArea.longitude }}
            radius={safeArea.diameter}
          />}
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title={"title"}
            description={"marker.description"}
          />
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
export default CheckMyLocation;
