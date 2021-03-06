import 'react-native-reanimated';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import LoadingIndicator from './src/LoadingIndicator';
import WaveThingy from './src/PhoneRingIndicatorWave';
import DiagonalOpenMenu from './src/DiagonalOpenMenu';
import DynamicFlatList from './src/DynamicFlatList';
import VotedAnimation from './src/VotedAnimation';
import ProcessingLoop from './src/ProcessingLoop';
import ShapeLike from './src/ShapeLike';
import ProcessIndicator, { INIT_PROPS } from './src/ProcessIndicator';

export default function App() {
  return (
    <View style={styles.container}>
      {/*<AnimatedStyleUpdateExample />*/}
      {/*<LoadingIndicator size={100} />*/}
      {/*<WaveThingy />*/}
      {/*<DiagonalOpenMenu />*/}
      {/*<DynamicFlatList />*/}
      {/*<VotedAnimation />*/}
      {/*<ProcessingLoop />*/}
      {/*<ShapeLike />*/}
      <ProcessIndicator {...INIT_PROPS} />
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
