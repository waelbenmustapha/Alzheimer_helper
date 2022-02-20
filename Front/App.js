import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CheckNotes from './Src/Views/CheckNotes';
import CheckNote from './Src/Views/CheckNote';

export default function App() {
  return (
    <View style={styles.container}>
      <CheckNotes/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});
