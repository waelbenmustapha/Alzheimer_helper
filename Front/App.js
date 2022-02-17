import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CheckNotes from './Src/Views/CheckNotes';
import CheckMyLocation from './Src/Views/Demantia/CheckMyLocation';

export default function App() {
  return (
    <View style={styles.container}>
<CheckMyLocation/>
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
