import React, { ReactChild } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Platform,
  Dimensions,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

import { colorPalette } from '&app/config/colors';
import { Title } from './titles/titles.styled';

interface Props {
  /** A text to be displayed in the center of this component */
  title: string;

  /**light background */
  light?: boolean;

  /** Handle Press for set code button */
  handlePress?: Function;

  /**  React component that will be showed on the left part of the titlebar */
  leftIcon?: Element;

  /** Function that will be triggered when left icon clicked */
  handleLeftIconPress?: Function;

  /**  React component that will be showed on the right part of the titlebar */
  rightIcon?: ReactChild | null;

  /**  React component that will be showed on the right part of the titlebar to the left of right icon */
  secondRightIcon?: ReactChild | null;

  /** Function that will be triggered when right icon clicked */
  handleRightIconPress?: Function;

  /** Function that will be triggered when second right icon clicked */
  handleSecondRightIconPress?: Function;

  /** Specifies whether right icon is disabled or not */
  disabledRightIcon?: boolean;

  /** Specifies whether left icon is disabled or not */
  disabledLeftIcon?: boolean;
}

const AppBar = (props: Props) => {
  const navigation = useNavigation();
  const {
    title,
    light,
    leftIcon: LeftIcon,
    handleLeftIconPress,
    rightIcon: RightIcon,
    secondRightIcon: SecondRightIcon,
    handleRightIconPress,
    handleSecondRightIconPress,
    disabledRightIcon = false,
    disabledLeftIcon = false,
  } = props;

  // WIP check LeftIcon and RightIcon
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
      />
      <SafeAreaView
        style={{
          ...styles.container,
          backgroundColor: light ? '#fdfefe' : 'rgb(237, 233, 234)',
        }}>
        <View style={styles.leftContainer}>
          {LeftIcon ? (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() =>
                handleLeftIconPress
                  ? handleLeftIconPress()
                  : navigation.goBack()
              }
              disabled={disabledLeftIcon}>
              {LeftIcon}
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.midContainer}>
          <Title
            text={title}
            styled={{
              fontSize: Dimensions.get('window').width < 400 ? 21 : 24,
            }}
          />
        </View>
        {SecondRightIcon ? (
          <View style={styles.secondRightContainer}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => handleSecondRightIconPress()}>
              {SecondRightIcon}
            </TouchableOpacity>
          </View>
        ) : null}
        <View
          style={
            SecondRightIcon
              ? styles.rightContainerWithSecondary
              : styles.rightContainer
          }>
          {RightIcon ? (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => handleRightIconPress()}
              disabled={disabledRightIcon}>
              {RightIcon}
            </TouchableOpacity>
          ) : null}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? hp('15%') : hp('13%'),
    marginTop: 15,
    width: '100%',
  },

  iconContainer: {
    alignItems: 'center',
    height: '80%',
    justifyContent: 'center',
    width: '80%',
  },

  leftContainer: {
    alignItems: 'flex-start',
    height: '100%',
    justifyContent: 'center',
    width: wp('25%'),
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('7%'),
    marginTop: hp('5%'),
    width: '100%',
  },

  midContainer: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    width: wp('50%'),
  },

  rightContainer: {
    alignItems: 'flex-end',
    height: '100%',
    justifyContent: 'center',
    width: wp('25%'),
  },
  rightContainerWithSecondary: {
    alignItems: 'flex-start',
    height: '100%',
    justifyContent: 'center',
    width: wp('12.5%'),
  },

  secondRightContainer: {
    alignItems: 'flex-start',
    height: '100%',
    justifyContent: 'center',
    width: wp('12.5%'),
  },
});

export { AppBar };
