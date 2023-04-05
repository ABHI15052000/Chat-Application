import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { StackNavigator } from './StackNavigation';
export default function App() {
  return (
    <View style={styles.container}>
      <StackNavigator />
      <ExpoStatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : null
  },
});
