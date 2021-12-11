import 'react-native-reanimated';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import AnimatedStyleUpdateExample from './src/AnimatedStyleUpdateExample';

export default function App() {
  return (
    <View style={styles.container}>
      <AnimatedStyleUpdateExample />
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
