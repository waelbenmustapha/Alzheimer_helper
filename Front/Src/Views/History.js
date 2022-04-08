import { View, Text,Button, StyleSheet,SafeAreaView,StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'

const History = ({ navigation }) => {
  return (
<View>
<TouchableOpacity style={styles.donebutton}

onPress={() =>
  navigation.navigate('HistoryDementia')
}
><Text>History</Text></TouchableOpacity>
<TouchableOpacity style={styles.donebutton}

onPress={() =>
  navigation.navigate('AddHistoryDementia')
}
><Text>Add History</Text></TouchableOpacity>
</View>
  );
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
      borderColor: '#359A8E',
      backgroundColor: '#fff',
      shadowColor: '#359A8E',
      shadowOpacity: 0.55,
      shadowRadius: 2.22,
      elevation: 11,
    },});
export default History