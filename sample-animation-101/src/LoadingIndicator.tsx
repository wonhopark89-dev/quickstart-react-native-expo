import React, { useMemo } from 'react';
import { View } from 'react-native';
import { MotiView } from 'moti';

const LoadingIndicator = ({ size }: { size: number }) => {
  const Circle = ({ size }: { size: number }) =>
    useMemo(
      () => (
        <MotiView
          from={{
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 0,
            shadowOpacity: 0.5,
          }}
          animate={{
            width: size + 20,
            height: size + 20,
            borderRadius: (size + 20) / 2,
            borderWidth: (size + 20) / 10,
          }}
          transition={{
            type: 'timing',
            duration: 1000,
            // repeat: Infinity,
            loop: true,
            // repeatReverse: true,
          }}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: size / 10,
            borderColor: 'white',
            shadowColor: 'pink',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            shadowRadius: 15,
          }}
        />
      ),
      [],
    );

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#010100' }}>
      <Circle size={size} />
    </View>
  );
};

export default LoadingIndicator;
