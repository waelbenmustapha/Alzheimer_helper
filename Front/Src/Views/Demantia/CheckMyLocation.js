import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';

const CheckMyLocation = () => {

  
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
      console.log(location.coords.latitude);
      setLocation(location);
    })();
  }
  useEffect(() => {
    getlocation();

    const interval = setInterval(() => {
      getlocation();
     console.log("seconds 10")
    }, 10000);
    
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