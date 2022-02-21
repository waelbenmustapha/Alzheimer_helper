import { View, Button,StyleSheet,StatusBar } from 'react-native'
import React from 'react'

const Location = ({navigation}) => {
  return (
      <View style={styles.container}>
      <Button
      title="Go check my demantia location"
      onPress={() =>
        navigation.navigate('CheckDemantiaLocation')
      }
    />
     <Button
      title="Go my location"
      onPress={() =>
        navigation.navigate('DemantiaLocation')
      }
    />
    </View> 
      )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:StatusBar.currentHeight
    }});

export default Location