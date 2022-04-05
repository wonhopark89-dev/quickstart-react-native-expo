import * as React from 'react';
import { Entypo } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { Pressable, View } from 'react-native';
import { useCallback, useState } from 'react';

const colors = {
  primary: '#F0B6D5',
  secondary: '#FFEDF3',
};

const ShapeLike = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const onClickLike = useCallback(() => setIsActive((prev) => !prev), []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Pressable onPress={() => onClickLike()}>
        <View>
          <MotiView
            style={{
              padding: 10,
              borderRadius: 20,
              backgroundColor: colors.secondary,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
            <MotiView
              from={{
                scale: 1,
              }}
              animate={{
                scale: isActive ? 5 : 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 60,
                damping: 10,
              }}>
              <Entypo name="heart" size={40} color={colors.primary} />
            </MotiView>
            <MotiView
              from={{
                scale: 0,
                opacity: 0,
              }}
              animate={{
                scale: isActive ? 1 : 0,
                opacity: isActive ? 1 : 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 60,
                damping: 10,
                delay: isActive ? 500 : 0,
              }}
              style={{ position: 'absolute' }}>
              <Entypo name="flower" size={40} color={'#fff'} />
            </MotiView>
            <MotiView
              from={{
                scale: 0.3,
                opacity: 0,
                borderWidth: 4,
              }}
              animate={{
                scale: isActive ? [0, 1.6, 1.7] : 0.2,
                opacity: isActive ? [1, 1, 0] : 0,
                borderWidth: isActive ? [2, 2, 0] : 0,
              }}
              transition={{
                type: 'timing',
                duration: 250,
              }}
              style={{
                position: 'absolute',
                borderColor: 'white',
                width: '100%',
                height: '100%',
                borderRadius: 20,
              }}
            />
          </MotiView>
        </View>
      </Pressable>
    </View>
  );
};

export default ShapeLike;
