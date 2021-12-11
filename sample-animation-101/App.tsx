import 'react-native-reanimated';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import LoadingIndicator from './src/LoadingIndicator';

export default function App() {
  return (
    <View style={styles.container}>
      {/*<AnimatedStyleUpdateExample />*/}
      <LoadingIndicator size={100} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
