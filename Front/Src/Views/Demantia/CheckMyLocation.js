import React, { useEffect, useState } from 'react'
import MapView, { Marker,Circle } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import {URL} from "@env"

const CheckMyLocation = ({navigation}) => {

 async function postLocation(latitude,longitude){
    console.log("**********************************")
    console.log(latitude+"and "+longitude),
    console.log("**********************************")
   await axios.post(`http://192.168.1.26:8090/dementia/post-location/4028b8817f8386b8017f838805b40000/${latitude.toFixed(7)}/${longitude.toFixed(7)}`).then((res)=>console.log(res.data)).catch((err)=>console.log("ell error"+err))
  }
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
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
    getlocation();

    const interval = setInterval(() => {
      getlocation();
     console.log("seconds 10")
    }, 15000);
    
   
  }, []);

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