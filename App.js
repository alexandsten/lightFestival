import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LightMap from './components/light-map';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Light festival</Text>
      <StatusBar style="auto" />
      <LightMap />
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
