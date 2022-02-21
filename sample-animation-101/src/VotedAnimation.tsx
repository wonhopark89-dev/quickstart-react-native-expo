import { Feather } from '@expo/vector-icons';
import { MotiText, MotiView } from '@motify/components';
import { AnimatePresence } from 'framer-motion';
import * as React from 'react';
import { Dimensions, Pressable, StatusBar, StyleProp, StyleSheet, TextProps, TextStyle, View } from 'react-native';
import { ReactNode } from 'react';

const { width, height } = Dimensions.get('screen');

const _size = width * 0.4;
const _color = '#3DC916';
// const _delay = 100;
const _duration = 300;
const _counterSize = 102;

interface MyTextProps {
  hasVoted: boolean;
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}

const MyText = ({ hasVoted, children, ...props }: MyTextProps) => {
  return (
    <MotiText
      {...props}
      animate={
        {
          // backgroundColor: hasVoted ? '#ffffff' : '#000000',
          // color: hasVoted ? '#ffffff' : '#000000',
        }
      }
      transition={{
        type: 'timing',
        duration: _duration,
        // delay: _delay
      }}>
      {children}
    </MotiText>
  );
};

const VotedAnimation = () => {
  const [progress, setProgress] = React.useState(17);
  const hasVoted = React.useRef<boolean>(false);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
      <StatusBar hidden />
      <AnimatePresence exitBeforeEnter>
        {!hasVoted.current ? (
          <MotiView
            from={{ translateY: 10, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: -10, opacity: 0 }}
            transition={{
              type: 'timing',
              duration: _duration * 0.7,
            }}
            key="nope"
            style={styles.topContainer}>
            <MyText hasVoted={hasVoted.current} style={styles.title}>
              Be Amazing
            </MyText>
            <MyText hasVoted={hasVoted.current} style={styles.subtitle}>
              TODAY
            </MyText>
          </MotiView>
        ) : (
          <MotiView
            from={{ translateY: 10, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: -10, opacity: 0 }}
            transition={{
              type: 'timing',
              duration: _duration * 0.7,
            }}
            key="yep"
            style={styles.topContainer}>
            <MyText hasVoted={hasVoted.current} style={styles.title}>
              Nice
            </MyText>
            <MyText hasVoted={hasVoted.current} style={styles.subtitle}>
              You're amazing!
            </MyText>
          </MotiView>
        )}
      </AnimatePresence>
      <View style={{ zIndex: -1 }}>
        {/* Green Background */}
        <MotiView
          animate={{
            scale: hasVoted.current ? 10 : 1,
          }}
          transition={{
            type: 'timing',
            duration: _duration * 1.4,
          }}
          style={{
            position: 'absolute',
            width: _size,
            height: _size,
            borderRadius: _size / 2,
            backgroundColor: _color,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
        <Pressable
          onPress={() => {
            if (!hasVoted.current) {
              setProgress((progress) => progress + 1);
            } else {
              setProgress((progress) => progress - 1);
            }
            hasVoted.current = !hasVoted.current;
          }}>
          <MotiView
            animate={{
              backgroundColor: hasVoted.current ? '#fff' : _color,
            }}
            transition={{
              type: 'timing',
              duration: _duration,
            }}
            style={{
              width: _size,
              height: _size,
              borderRadius: _size / 2,
              backgroundColor: _color,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AnimatePresence exitBeforeEnter>
              {!hasVoted.current ? (
                <MotiView
                  key="nopeIcon"
                  from={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: 'timing',
                    duration: _duration / 10,
                  }}>
                  <Feather name="check" size={_size / 2} color="white" />
                </MotiView>
              ) : (
                <MotiView
                  key="yepIcon"
                  from={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: 'timing',
                    duration: _duration / 10,
                  }}>
                  <Feather name="check" size={_size / 2} color={_color} />
                </MotiView>
              )}
            </AnimatePresence>
          </MotiView>
        </Pressable>
      </View>
      <View style={{ alignItems: 'center' }}>
        <MyText hasVoted={hasVoted.current} style={styles.streak}>
          Streak
        </MyText>
        <View style={{ flexDirection: 'row' }}>
          {progress
            .toString()
            .split('')
            .map((value, index) => {
              return (
                <View
                  key={index}
                  style={{
                    overflow: 'hidden',
                    justifyContent: 'center',
                    height: _counterSize,
                    width: _counterSize * 0.6,
                    alignItems: 'center',
                  }}>
                  <AnimatePresence>
                    <MotiText
                      from={{
                        opacity: 0,
                        translateY: hasVoted.current ? _counterSize * 1.2 : -_counterSize * 1.2,
                        // color: hasVoted.current ? '#000' : '#fff',
                        // backgroundColor: hasVoted.current ? '#000' : '#fff',
                      }}
                      animate={{
                        opacity: 1,
                        translateY: 0,
                        backgroundColor: hasVoted.current ? 'green' : 'white',
                        // color: hasVoted.current ? '#fff' : '#000',
                      }}
                      exit={{
                        opacity: 0,
                        translateY: hasVoted.current ? _counterSize * 1.2 : -_counterSize * 1.2,
                      }}
                      transition={{
                        duration: _duration,
                        type: 'timing',
                      }}
                      // transition={{duration: 350, type: 'timing'}}
                      key={`progress-${index}-${value}`}
                      style={styles.counter}>
                      {value}
                    </MotiText>
                  </AnimatePresence>
                </View>
              );
            })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    alignItems: 'center',
    // position: 'absolute'
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    textTransform: 'uppercase',
    opacity: 0.7,
  },
  streak: {
    fontSize: 16,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  counter: {
    fontSize: _counterSize,
    fontFamily: 'Georgia',
    position: 'absolute',
    margin: 0,
  },
});

export default VotedAnimation;
