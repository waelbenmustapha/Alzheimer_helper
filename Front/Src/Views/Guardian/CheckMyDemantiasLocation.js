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
import { sendPushNotification } from "../../Utils/Notif";
import AsyncStorage from "@react-native-async-storage/async-storage";
const CheckMyDemantiasLocation = () => {
  const[Danger, setDanger] = useState(false);
  const [safe, setSafeArea] = useState(null);
  const[safezones, setSafezones] = useState(false);

  const [location, setLocation] = useState(null);
  const messageGuardian = {   
    'title': 'Your dementia passed his Safe zone',
   'body': 'Your dementia is out of his safe zone, make sure to check out for his location and get him as safe as possible.    '
 }
 const messageDementia = {   
  'title': 'You go out of green zone',
 'body': ''
}
  function goToLocation() {
    mapRef.current.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.004,
      longitudeDelta: 0.005,
    });
  }

  const mapRef = useRef();

    
  async function getDemantiaLocation(vall) {
      AsyncStorage.getItem('user')
      .then(value=>
   { 
     console.log(`https://alzhelper.herokuapp.com/guardian/getMyDementiaLocation/${JSON.parse(value).id}`
     )
     axios
      .get(
        `https://alzhelper.herokuapp.com/guardian/getMyDementiaLocation/${JSON.parse(value).id}`
      )
      .then((res) => {
        setLocation(res.data);
        if (
            getDistance(
                { latitude: res.data.latitude, longitude: res.data.longitude },vall) > 300
        ) {
             sendPushNotification(JSON.parse(value).pushToken,messageGuardian.title,messageGuardian.body);
             sendPushNotification(JSON.parse(value).dementia.pushToken,messageDementia.title,messageDementia.body);

          setDanger(true);
        } else {
          setDanger(false);
        }
        
      })
      .catch((err) => console.log("ell error" + err));}
  
  )}
  function getEnableSafeZone(){
return safezones.filter(safe =>safe.active==true)  }
 

async function getAllSafeZones(){
   AsyncStorage.getItem('user')
    .then(value=>
 {
   axios
    .get(
      `https://alzhelper.herokuapp.com/dementia/get-safezones/${JSON.parse(value).dementia.id}`
    ).then(res=> {
    setSafezones(res.data)


setSafeArea(res.data.filter(safe =>safe.active==true)[0])  
getDemantiaLocation(res.data.filter(safe =>safe.active==true)[0]);
 

    // setSafeArea()  
  }
  )}
  )}

  useEffect(  () => {
    getAllSafeZones();

    const interval = setInterval(() => {
      getAllSafeZones()
    }, 15000);
    console.log(interval)
    return () => {
      clearInterval(interval);
      console.log("clearing useeffect")

  }    
  }, []);

  if (location == null||safe==null) {
    return (
      <View>
        <Text>Loading </Text>
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
          {safe==null?null:<Circle
            strokeColor="red"
            strokeWidth={4}
            fillColor="rgba(90, 162, 124, 0.2)"
            center={{ latitude: safe.latitude, longitude: safe.longitude }}
            radius={safe.diameter}
          />}
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
