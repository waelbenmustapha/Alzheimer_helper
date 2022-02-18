import { View, Text,Button } from 'react-native'
import React from 'react'

const Home = ({ navigation }) => {
  return (
    <View>
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

export default Home