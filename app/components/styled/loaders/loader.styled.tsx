import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  Modal,
  StatusBar,
  Text,
} from 'react-native';

import RentsLogo from '&assets/images/loader/rents_logo.png';

const { height, width } = Dimensions.get('screen');

interface Props {
  visible: boolean;
}

const Loader: React.FC<Props> = (props) => {
  const { visible } = props;

  const [rotation] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    StartRotation();
  }, []);

  const StartRotation = () => {
    rotation.setValue(0);

    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  const RotateData = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Modal
      transparent
      visible={visible}
      supportedOrientations={['portrait']}
      onRequestClose={() => {}}>
      <StatusBar backgroundColor="rgba(255,255,255,0.45)" />
      <View style={styles.container}>
        <View style={styles.center}>
          <Animated.Image
            style={{ transform: [{ rotate: RotateData }], width: width * 0.2, height: width * 0.2 }}
            source={RentsLogo}
          />
          <Text>Loading...</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  center: {
    position: 'absolute',
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.45)',
    flex: 1,
    height: height,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    top: 0,
    width: width,
    zIndex: 100,
  },
});

export { Loader };
