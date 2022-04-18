import React, { useEffect, useState } from "react";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  TextInput,
} from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SpecifySafeArea = () => {
  const [marker, setMarker] = useState(null);
  const [title, setTitle] = useState(null);

  const [radius, setRadius] = useState(300);
  const [location, setLocation] = useState(null);

function saveSafeArea(){
  console.log(marker.latitude.toFixed(7));
  console.log(marker.longitude.toFixed(7))
  AsyncStorage.getItem('user')
  .then(value=>
  {axios.post(`https://alzhelper.herokuapp.com/dementia/safezone/${JSON.parse(value).dementia.id}`,
  {latitude:marker.latitude.toFixed(7),longitude:marker.longitude.toFixed(7),diameter:radius})})
}

  function getlocation() {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }

  useEffect(() => {
    getlocation();
  }, []);
  if (location == null) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <MapView
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.004,
          longitudeDelta: 0.005,
        }}
        onLongPress={(e) => setMarker(e.nativeEvent.coordinate)}
        style={{ flex: 1 }}
      >
        {marker && (
          <>
            <Circle
            key={radius}
              strokeColor="red"
              strokeWidth={2}
              fillColor="rgba(90, 162, 124, 0.2)"
              center={marker}
              radius={radius}
            />
            <Marker coordinate={marker} />
          </>
        )}
      </MapView>
      <View
        style={{
          position: "absolute", //use absolute position to show button on top of the map
          bottom: "10%",
          right: "10%",
          left: "10%",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          width: "80%",
        }}
      ><Text style={{color:'black',opacity:0.7}}>Press for 2 seconds to pick location</Text></View>
      <View
        style={{
          position: "absolute", //use absolute position to show button on top of the map
          top: "10%",
          right: "25%",
          left: "25%",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          width: "50%",
        }}
      >
        <TextInput
          onChangeText={(text) => {text==""?setRadius(0):setRadius(parseInt(text))}}
          placeholder="Radius in meter"
          style={{
            backgroundColor: "white",
            borderRadius: 8,
            textAlign:'center',
            padding: 5,
            height: 40,
            marginBottom: 10,
          }}
          keyboardType="number-pad"
        ></TextInput>
              <TextInput
          onChangeText={(text) => {setTitle(text)}}
          placeholder="Title"
          style={{
            backgroundColor: "white",
            borderRadius: 8,
            textAlign:'center',
            padding: 5,
            height: 40,
            marginBottom: 10,
            width:"45%"
          }}
      
        ></TextInput>
        <TouchableOpacity
          style={{ backgroundColor: "white", borderWidth:1,borderColor:'gray',padding: 10, borderRadius: 8 }}
          onPress={() =>saveSafeArea()}
        >
          <Text style={{ color: "black", textAlign: "center" ,opacity:0.7}}>
            Save Location
          </Text>
        </TouchableOpacity>

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
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
export default SpecifySafeArea;
