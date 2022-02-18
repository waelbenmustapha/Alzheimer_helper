import { View, Text,Button, StyleSheet,SafeAreaView,StatusBar } from 'react-native'
import React from 'react'

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:StatusBar.currentHeight
    }});
export default Home