import { View as MView } from 'moti';
import * as React from 'react';
import { ColorValue, Dimensions, StyleSheet, View } from 'react-native';

const { width, height } = Dimensions.get('screen');

interface ProcessIndicatorProps {
  thumbColor: ColorValue;
  trackColor: ColorValue;
}

export const INIT_PROPS: ProcessIndicatorProps = {
  thumbColor: '#EE4A5D',
  trackColor: '#FDB7BA',
};

const size = width * 0.8;
const INDICATOR_SIZE = size * 0.4;
const thumbHeight = 20;

const styles = StyleSheet.create({
  container: {
    width: size,
    height: thumbHeight,
    borderRadius: thumbHeight / 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

const ProcessIndicator = ({ thumbColor, trackColor }: ProcessIndicatorProps) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={[styles.container, { backgroundColor: trackColor }]}>
        <MView
          from={{
            translateX: -size / 2 - INDICATOR_SIZE / 2 + thumbHeight,
          }}
          animate={{
            translateX: size / 2 + INDICATOR_SIZE / 2 - thumbHeight,
          }}
          transition={{
            type: 'timing',
            duration: 500,
            loop: true,
          }}
          style={{
            position: 'absolute',
            backgroundColor: thumbColor,
            width: INDICATOR_SIZE,
            height: thumbHeight,
            borderRadius: thumbHeight / 2,
          }}
        />
      </View>
    </View>
  );
};

export default ProcessIndicator;
