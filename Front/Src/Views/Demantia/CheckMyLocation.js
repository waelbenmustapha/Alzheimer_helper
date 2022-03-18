import React, { useEffect, useState } from 'react'
import MapView, { Marker,Circle } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import {URL} from "@env"
import { getUser } from '../../Utils/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckMyLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userData, setuserData] =useState({});
  function postLocation(latitude,longitude){

    console.log("**********************************")
    console.log(latitude+"and "+longitude),
    console.log("**********************************")
    axios.post(`http://192.168.1.78:8090/dementia/post-location/${userData.id}/${latitude.toFixed(7)}/${longitude.toFixed(7)}`).then((res)=>console.log(res.data)).catch((err)=>console.log("ell error"+err))
  }
 

  function getlocation(){
    
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      postLocation(location.coords.latitude,location.coords.longitude);
      setLocation(location);
    })();
  }
  useEffect(() => {
    console.log("++++++++++++++++++++++++")

    AsyncStorage.getItem('user', (err, item) => {setuserData(JSON.parse(item));console.log(item)});
    console.log("++++++++++++++++++++++++")

    
    getlocation();

    const interval = setInterval(() => {
      getlocation();
     console.log("seconds 30")
    }, 30000);
    
  });

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  if(location==null){
    return <View><Text>Loading</Text></View>
  }
  else{
  return (
    <View style={styles.container}>
      

    <MapView style={styles.map} 
     initialRegion={{
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.004,
      longitudeDelta: 0.005,
    }} 
    >
<Circle center={{latitude:36.7399988,longitude:10.2324613}} radius={300}/>
<Marker
  coordinate={{ latitude: location.coords.latitude,
    longitude: location.coords.longitude, }}
  title={"title"}
      description={"marker.description"}
    />
    </MapView>
  </View>
  )
}}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
export default CheckMyLocation