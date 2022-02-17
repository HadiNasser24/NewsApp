import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { colorPalette } from '&config/colors';

interface TitleProps {
  /** Text for label */
  text: string;

  /** If you need another style to this input */
  styled?: any;
}

const Title = (props: TitleProps) => {
  const { text, styled } = props;
  return <Text style={[styles.title, styled]}>{text}</Text>;
};

const SubTitle = (props: TitleProps) => {
  const { text, styled } = props;
  return <Text style={[styles.subTitle, styled]}>{text}</Text>;
};

const TitleBlue = (props: TitleProps) => {
  const { text, styled } = props;
  return <Text style={[styles.titleBlue, styled]}>{text}</Text>;
};

const SubTitleBold = (props: TitleProps) => {
  const { text, styled } = props;
  return <Text style={[styles.subTitleBold, styled]}>{text}</Text>;
};

const styles = StyleSheet.create({
  subTitle: {
    color: colorPalette.darkNavy1,
    fontFamily: 'Rubik-Regular',
    fontSize: 18,
    letterSpacing: 0,
    textAlign: 'center',
  },

  subTitleBold: {
    color: colorPalette.darkNavy1,
    fontFamily: 'Rubik-Bold',
    fontSize: 17,
    letterSpacing: 0,
    textAlign: 'center',
  },

  title: {
    color: colorPalette.darkNavy1,
    fontFamily: 'Rubik-Medium',
    fontSize: 24,
    letterSpacing: 0,
    textAlign: 'center',
  },

  titleBlue: {
    color: colorPalette.blue1,
    fontFamily: 'Rubik-Medium',
    fontSize: 20,
    letterSpacing: 0,
    textAlign: 'left',
  },
});

export { Title, TitleBlue, SubTitle, SubTitleBold };
