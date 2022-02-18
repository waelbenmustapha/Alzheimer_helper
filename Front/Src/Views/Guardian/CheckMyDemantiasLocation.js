import React, { useEffect, useRef, useState } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const CheckMyDemantiasLocation = () => {

function goToLocation(){
    mapRef.current.animateToRegion({
        latitude:33.333,
        longitude:10.000,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      })
}

const mapRef=useRef();

  function postLocation(latitude,longitude){
    console.log("**********************************")
    console.log(latitude+"and "+longitude),
    console.log("**********************************")
    axios.post(`http://192.168.1.60:8090/demantia/post-location/4028b8817f092fe7017f0931962d0001/${latitude}/${longitude}`).then((res)=>console.log(res.data)).catch((err)=>console.log("ell error"+err))
  }
  
  useEffect(() => {

    const interval = setInterval(() => {
    
     console.log("seconds 10 getting")
    }, 10000);
    
  }, []);

 
  if(null!==null){
    return <View><Text>Loading</Text></View>
  }
  else{
  return (
    <View style={styles.container}>
      
<TouchableOpacity style={{marginTop:75}} onPress={()=>goToLocation()}><Text>Go to location</Text></TouchableOpacity>
    <MapView style={styles.map} 
    ref={mapRef}
     initialRegion={{
      latitude: 36.7355500,
      longitude: 10.2321500,
      latitudeDelta: 0.004,
      longitudeDelta: 0.005,
    }} 
    >

<Marker
  coordinate={{ latitude: 36.7355500,
    longitude: 10.2321500, }}
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
export default CheckMyDemantiasLocation