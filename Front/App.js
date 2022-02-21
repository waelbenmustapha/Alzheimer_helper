import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AddNotes from './Src/Views/AddNotes';
import CheckNotes from './Src/Views/CheckNotes';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome to ALZH</Text>
      <AddNotes/>
      <CheckNotes/>

      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
