import * as React from 'react';
import { Dimensions, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useEffect, useMemo } from 'react';

const { width, height } = Dimensions.get('window');

const CONTAINER_WIDTH = width * 0.9;
const CONTAINER_HEIGHT = height * 0.1;
const DURATION = 1000;
const DELAY = 500;
const MAX = 4;

const Rect = ({ index }: { index: number }) => {
  const animation = useSharedValue(0);
  const stylez = useAnimatedStyle(() => {
    return {
      width: animation.value,
    };
  });

  useEffect(() => {
    animation.value = withDelay(
      index * DURATION,
      withRepeat(
        withSequence(
          withTiming(0, { duration: DURATION }),
          withTiming(0, { duration: DURATION }),
          withTiming(CONTAINER_WIDTH * 0.7, { duration: DURATION }),
          withTiming(0, { duration: DURATION }),
        ),
        Infinity,
        true,
      ),
    );
  }, []);

  return <Animated.View style={[{ borderWidth: 3, borderColor: '#D18063', height: '100%' }, stylez]} />;
};

const ProcessingLoop = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          width: CONTAINER_WIDTH,
          height: CONTAINER_HEIGHT,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#F9D9CA',
          padding: 8,
        }}>
        {[...Array(MAX).keys()].map((i) => {
          return <Rect index={i} key={i} />;
        })}
      </View>
    </View>
  );
};

export default ProcessingLoop;
