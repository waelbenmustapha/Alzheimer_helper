import { View, TouchableOpacity, StyleSheet, StatusBar, Text } from 'react-native'
import React from 'react'

const Location = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.donebutton}

        onPress={() =>
          navigation.navigate('CheckDemantiaLocation')
        }
      ><Text>Go check my demantia location</Text></TouchableOpacity>
      {/* <TouchableOpacity style={styles.donebutton}
        onPress={() =>
          navigation.navigate('DemantiaLocation')
        }
      ><Text>Go my location</Text></TouchableOpacity> */}
       <TouchableOpacity style={styles.donebutton}

onPress={() =>
  navigation.navigate('SpecifySafeArea')
}
><Text>Specify Safe area</Text></TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  },
  donebutton: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    borderColor: '#093F38',
    backgroundColor: '#fff',
    shadowColor: '#093F38',
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 11,
  },
});




export default Location