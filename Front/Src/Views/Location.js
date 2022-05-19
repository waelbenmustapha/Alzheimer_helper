import { View, TouchableOpacity, StyleSheet, StatusBar, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";

const Location = ({ navigation }) => {
  return (

 <LinearGradient
    // Button Linear Gradient
    colors={["#359A8E50", "#4A0D6650"]}
    style={styles.container}
    end={{ x: 0.8, y: 0.5 }}
  >     
   <TouchableOpacity style={styles.donebutton}

        onPress={() =>
          navigation.navigate('CheckDemantiaLocation')
        }
      ><Text>Go check my demantia location</Text></TouchableOpacity>

       <TouchableOpacity style={styles.donebutton}

onPress={() =>
  navigation.navigate('SpecifySafeArea')
}
><Text>Specify Safe area</Text></TouchableOpacity>
<TouchableOpacity style={styles.donebutton}

onPress={() =>
  navigation.navigate('SafeZones')
}
><Text>Safe Zones</Text></TouchableOpacity>
    </LinearGradient>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:"10%",
  },
  donebutton: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    borderColor: '#359A8E',
    backgroundColor: '#fff',
    shadowColor: '#359A8E',
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 11,
  },
});




export default Location