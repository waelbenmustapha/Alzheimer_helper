import { View, Text,Button, StyleSheet,SafeAreaView,StatusBar } from 'react-native'
import React from 'react'

const History = ({ navigation }) => {
  return (
<View>
  <Text>History</Text>
</View>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:StatusBar.currentHeight
    }});
export default History