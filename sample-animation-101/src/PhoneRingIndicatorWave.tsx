import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';

const color = 'pink';
const size = 100;
const WAVE_CIRCLE_SIZE = [...Array(3).keys()];

const WaveThingy = () => {
  const WaveCircle = () =>
    useMemo(
      () => (
        <>
          <View style={[styles.dot, styles.center]}>
            {WAVE_CIRCLE_SIZE.map((index) => {
              return (
                <MotiView
                  from={{ opacity: 0.7, scale: 1 }}
                  animate={{ opacity: 0, scale: 4 }}
                  transition={{
                    type: 'timing',
                    duration: 2000,
                    easing: Easing.out(Easing.ease),
                    loop: true,
                    repeatReverse: false,
                    delay: index * 400,
                  }}
                  key={index}
                  style={[StyleSheet.absoluteFill, styles.dot]}
                />
              );
            })}
            <Feather name={'phone-outgoing'} size={32} color={'#fff'} />
          </View>
        </>
      ),
      [],
    );

  return (
    <View style={[{ flex: 1 }, styles.center]}>
      <WaveCircle />
    </View>
  );
};

export default WaveThingy;

const styles = StyleSheet.create({
  dot: {
    width: size,
    height: size,
    borderRadius: size,
    backgroundColor: color,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
