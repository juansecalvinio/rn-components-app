import {useContext} from 'react';
import {Animated, Easing, Pressable, StyleSheet, Text} from 'react-native';

import {useAnimation} from '../../hooks/useAnimation';
import {ThemeContext} from '../../context/ThemeContext';
import {CustomView} from '../../components/ui/CustomView';
import {Button} from '../../components/ui/Button';

export const Animation101Screen = () => {
  const {colors} = useContext(ThemeContext);

  const {
    fadeIn,
    fadeOut,
    animatedOpacity,
    animatedTop,
    startMovingTopPosition,
  } = useAnimation();

  return (
    <CustomView style={styles.container}>
      <Animated.View
        style={[
          styles.purpleBox,
          {
            backgroundColor: colors.primary,
            opacity: animatedOpacity,
            transform: [
              {
                translateY: animatedTop,
              },
            ],
          },
        ]}
      />

      <Button
        onPress={() => {
          fadeIn({});
          startMovingTopPosition({
            initialPosition: -100,
            easing: Easing.elastic(1),
            duration: 750,
          });
        }}
        styles={{marginTop: 10}}
        text="Fade in"
      />

      <Button
        onPress={() => fadeOut({})}
        styles={{marginTop: 10}}
        text="Fade out"
      />
    </CustomView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  purpleBox: {
    width: 150,
    height: 150,
  },
});
