import { View, Text,Button, StyleSheet,SafeAreaView,StatusBar } from 'react-native'
import React from 'react'

const Contact = ({ navigation }) => {
  return (
<View>
  <Text>Contact</Text>
</View>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:StatusBar.currentHeight
    }});
export default Contact