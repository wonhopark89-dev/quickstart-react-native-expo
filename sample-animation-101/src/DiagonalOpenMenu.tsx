//https://dribbble.com/shots/2209627-UI8-Nav
import React, { Component, useEffect, useRef, useState } from 'react';
import {
  StatusBar,
  Easing,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Constants from 'expo-constants';

const { width, height } = Dimensions.get('window');
const DURATION = 400;
const LOGO_SIZE = 130;
const ICON_SIZE = 30;
const CLOSE_MODE = 200;
const ICON_LINE_HEIGHT = 2;

const closeItems = [0, 1];
const burgerItems = [0, 1, 2];

const styles = StyleSheet.create({
  closeContainer: {
    height: ICON_SIZE,
    width: ICON_SIZE,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 40,
    right: 40,
  },
  line: {
    height: ICON_LINE_HEIGHT,
    width: ICON_SIZE,
    backgroundColor: '#aaa',
  },
  burgerContainer: {
    justifyContent: 'space-around',
  },
  lineMedium: {
    width: ICON_SIZE * 0.67,
    alignSelf: 'flex-start',
  },
  lineSmall: {
    width: ICON_SIZE * 0.45,
    alignSelf: 'flex-end',
  },
  image: {
    resizeMode: 'contain',
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    top: height / 2 - LOGO_SIZE / 2,
    left: width / 2 - LOGO_SIZE / 2,
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'space-around',
    paddingVertical: height / 5,
    backgroundColor: 'white',
  },
  buttonStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#353535',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  strip: {
    backgroundColor: '#353535',
    height: height,
    width: width * 3,
  },
  top: {
    // backgroundColor: 'green',
  },
  bottom: {
    // backgroundColor: 'red',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});

const DiagonalOpenMenu = () => {
  const animateStripe = useRef(new Animated.Value(height)).current;
  const animateBg = useRef(new Animated.Value(0)).current;
  const animateOpacity = useRef(new Animated.Value(1)).current;
  const [finished, setFinished] = useState<boolean>(false);
  const [closeFinished, setCloseFinished] = useState<boolean>(false);

  const [closeAnimations, setCloseAnimations] = useState(
    closeItems.map((_, index) => new Animated.Value(index === 0 ? -CLOSE_MODE : CLOSE_MODE)),
  );
  const [burgerAnimations, setBurgerAnimations] = useState(burgerItems.map((_, index) => new Animated.Value(0)));

  const top = animateStripe.interpolate({
    inputRange: [0, height],
    outputRange: [-height / 4, 0],
    extrapolate: 'clamp',
  });

  const bottom = animateStripe.interpolate({
    inputRange: [0, height],
    outputRange: [height / 4, 0],
    extrapolate: 'clamp',
  });

  const opacity = animateStripe.interpolate({
    inputRange: [0, height / 1.5, height],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
  });

  const translateContent = animateStripe.interpolate({
    inputRange: [0, height],
    outputRange: [0, 30],
    extrapolate: 'clamp',
  });

  const bgColor = animateBg.interpolate({
    inputRange: [0, 0.002, 1],
    outputRange: ['transparent', '#2F8BE6', '#2F8BE6'],
  });

  const scaleLogo = animateOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  const animateClose = () => {
    const animations = closeItems.map((i) => {
      if (closeFinished) {
        return Animated.timing(closeAnimations[i], {
          toValue: i === 0 ? -CLOSE_MODE : CLOSE_MODE,
          duration: DURATION,
          useNativeDriver: false,
        });
      } else {
        return Animated.sequence([
          Animated.delay(DURATION / 2),
          Animated.timing(closeAnimations[i], {
            toValue: 0,
            duration: DURATION,
            useNativeDriver: false,
          }),
        ]);
      }
    });

    return Animated.stagger(150, animations);
  };

  const animateBurger = () => {
    const animations = burgerItems.map((i) => {
      if (closeFinished) {
        return Animated.timing(burgerAnimations[i], {
          toValue: 0,
          duration: DURATION,
          useNativeDriver: false,
        });
      } else {
        return Animated.timing(burgerAnimations[i], {
          toValue: CLOSE_MODE,
          duration: DURATION,
          useNativeDriver: false,
        });
      }
    });

    return Animated.stagger(150, animations);
  };

  const restartAnimation = () => {
    if (finished) {
      Animated.parallel([
        Animated.sequence([
          Animated.timing(animateBg, {
            toValue: 1,
            duration: DURATION / 10,
            useNativeDriver: false,
          }),
          Animated.timing(animateStripe, {
            toValue: height,
            duration: DURATION,
            // easing: Easing.out,
            useNativeDriver: false,
          }),
        ]),
        animateClose(),
        animateBurger(),
        Animated.sequence([
          Animated.delay(DURATION - 150),
          Animated.timing(animateOpacity, {
            toValue: 1,
            duration: DURATION,
            useNativeDriver: false,
          }),
        ]),
      ]).start(() => {
        animateBg.setValue(0);
        setCloseFinished((prev) => !prev);
      });
    } else {
      Animated.parallel([
        Animated.timing(animateOpacity, {
          toValue: 0,
          duration: DURATION,
          useNativeDriver: false,
        }),

        animateBurger(),
        animateClose(),

        Animated.sequence([
          Animated.delay(DURATION - 150),
          Animated.timing(animateStripe, {
            toValue: 0,
            duration: DURATION,
            // easing: Easing.out,
            useNativeDriver: false,
          }),
        ]),
      ]).start(() => {
        animateOpacity.setValue(0);
        setCloseFinished((prev) => !prev);
      });
    }
  };

  const closeDrawer = () => {
    setFinished(false);
    restartAnimation();
  };

  const CloseButton = () => (
    <View>
      {closeItems.map((i) => {
        const inputRange = i === 0 ? [-CLOSE_MODE, 0] : [0, CLOSE_MODE];

        const bg = closeAnimations[i].interpolate({
          inputRange: [-CLOSE_MODE / 3, 0, CLOSE_MODE / 3],
          outputRange: ['#aaa', '#353535', '#aaa'],
        });
        const opacity = closeAnimations[i].interpolate({
          inputRange: [-CLOSE_MODE / 3, 0, CLOSE_MODE / 3],
          outputRange: [0, 1, 0],
        });

        return (
          <Animated.View
            key={`close_${i}`}
            style={[
              styles.line,
              {
                marginBottom: i === 0 ? -ICON_LINE_HEIGHT : 0,
                backgroundColor: bg,
                transform: [{ rotate: i === 0 ? '90deg' : '0deg' }, { translateX: closeAnimations[i] }],
              },
            ]}
          />
        );
      })}
    </View>
  );

  const RenderBurger = () => (
    <View style={[styles.closeContainer, styles.burgerContainer, { position: 'absolute', top: 0, right: 0 }]}>
      <Animated.View style={[styles.line, styles.lineMedium, { transform: [{ translateX: burgerAnimations[1] }] }]} />
      <Animated.View style={[styles.line, { transform: [{ translateX: burgerAnimations[0] }] }]} />
      <Animated.View style={[styles.line, styles.lineSmall, { transform: [{ translateX: burgerAnimations[2] }] }]} />
    </View>
  );

  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: bgColor }]} />
      <Animated.View
        style={[
          styles.menuContainer,
          StyleSheet.absoluteFill,
          {
            backgroundColor: 'transparent',
            opacity: opacity,
            transform: [{ translateY: translateContent }],
          },
        ]}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
            backgroundColor: 'transparent',
          }}>
          <TouchableWithoutFeedback onPress={closeDrawer}>
            <Text style={styles.buttonStyle}>Login</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={closeDrawer}>
            <Text style={styles.buttonStyle}>Create account</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={closeDrawer}>
            <Text style={styles.buttonStyle}>Support</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={closeDrawer}>
            <Text style={styles.buttonStyle}>About</Text>
          </TouchableWithoutFeedback>
        </View>
      </Animated.View>
      <View style={{ backgroundColor: 'transparent', position: 'absolute', transform: [{ rotate: '-35deg' }] }}>
        <Animated.View
          style={[styles.strip, styles.top, { height: animateStripe, transform: [{ translateY: top }] }]}
        />
        <Animated.View
          style={[styles.strip, styles.bottom, { height: animateStripe, transform: [{ translateY: bottom }] }]}
        />
      </View>
      <Animated.Image
        source={{ uri: 'https://ui8.s3.amazonaws.com/v5/assets/global/touch-icon-ipad-retina.png' }}
        style={[
          StyleSheet.absoluteFill,
          styles.image,
          {
            opacity: animateOpacity,
            transform: [{ scale: scaleLogo }],
          },
        ]}
      />

      <TouchableWithoutFeedback
        onPress={() => {
          setFinished((prev) => !prev);
          restartAnimation();
        }}>
        <View style={[styles.closeContainer, styles.burgerContainer, { transform: [{ rotate: '-45deg' }] }]}>
          <CloseButton />
          <RenderBurger />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default DiagonalOpenMenu;
