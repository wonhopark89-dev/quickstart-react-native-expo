# sample-animation-101

## installation & setup

```
# Expo + Typescript + Reanimated
- https://docs.expo.dev/guides/typescript/#starting-from-scratch-using-a-typescript-template
- https://docs.expo.dev/versions/latest/sdk/reanimated/#installation
- update babel.config.js ( add plugins )
- import 'react-native-reanimated'; ( on App.js or App.tsx )

# Moti + Hermes-engine
- yarn add moti
- https://moti.fyi/installation#if-youre-using-react-native-064x
- https://github.com/facebook/hermes/releases/tag/v0.7.2
- yarn add hermes-engine@v0.7.2
( !! Compatibilty react-native <-> moti <-> hermes-engines )

# Svg
- https://docs.expo.dev/versions/latest/sdk/svg/#installation
- expo install react-native-svg
- https://docs.expo.dev/versions/latest/sdk/gesture-handler/#installation
- expo install react-native-gesture-handler
```

### tips

```
expo start --clear
```