import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import NewsIcon from '&assets/images/icons/news.svg';
import SourcesIcon from '&assets/images/icons/menu.svg';
import HistoryIcon from '&assets/images/icons/history.svg';

import { LandingComponent } from '&features/landing/landing.component';
import { SourcesComponent } from '&features/sources/sources.component';
import { HistoryComponent } from '&features/history/history.component';
import { RootState } from '&store/store';
import { colorPalette } from '&config/colors';

type ReduxProps = ConnectedProps<typeof connector>;

const BottomTabsComponent = (props: ReduxProps) => {
  const Tab = createBottomTabNavigator();
  const { tabBarVisible } = props;

  useEffect(() => {}, []);

  const tabBarOptions = {
    activeTintColor: colorPalette.white,
    inactiveTintColor: colorPalette.white,
    showLabel: false,
    animationEnabled: true,
    style: {
      backgroundColor: colorPalette.white,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      height: 60,
    },
    labelStyle: {
      fontSize: 8,
      fontFamily: 'Rubik-Medium',
      opacity: 0.6,
      paddingBottom: 5,
    },
  };

  const options = ({ route }) => ({
    tabBarVisible: tabBarVisible,
    tabBarIcon: ({ focused }) => {
      switch (route.name) {
        case 'Landing':
          return (
            <View style={styles.tabView}>
              <NewsIcon
                fill={focused ? '#FF464E' : colorPalette.darkNavy1}
                width={20}
                height={20}
              />
              <Text
                style={{
                  ...styles.label,
                  color: focused ? '#FF464E' : colorPalette.darkNavy1,
                }}>
                NEWS
              </Text>
            </View>
          );
        case 'Sources':
          return (
            <View style={styles.tabView}>
              <SourcesIcon
                width={20}
                height={20}
                fill={focused ? '#FF464E' : colorPalette.darkNavy1}
              />
              <Text
                style={{
                  ...styles.label,
                  color: focused ? '#FF464E' : colorPalette.darkNavy1,
                }}>
                SOURCES
              </Text>
            </View>
          );

        case 'History':
          return (
            <View style={styles.tabView}>
              <HistoryIcon
                width={20}
                height={20}
                fill={focused ? '#FF464E' : colorPalette.darkNavy1}
              />
              <Text
                style={{
                  ...styles.label,
                  color: focused ? '#FF464E' : colorPalette.darkNavy1,
                }}>
                HISTORY
              </Text>
            </View>
          );
        default:
          return null;
      }
    },
  });

  return (
    <Tab.Navigator
      tabBarOptions={tabBarOptions}
      screenOptions={options}
      backBehavior="initialRoute"
      initialRouteName={'Landing'}>
      <Tab.Screen
        component={LandingComponent}
        name="Landing"
        options={{
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        component={SourcesComponent}
        name="Sources"
        options={{
          tabBarLabel: 'SOURCES',
        }}
      />
      <Tab.Screen
        component={HistoryComponent}
        name="History"
        options={{
          tabBarLabel: 'HISTORY',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  label: {
    color: colorPalette.darkNavy1,
    fontFamily: 'Rubik-Medium',
    fontSize: 8,
    paddingTop: 5,
  },
  tabView: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const mapState = (state: RootState) => ({
  tabBarVisible: state.landing.tabBarVisible,
});

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);
const BottomTabsComponentRedux = connector(BottomTabsComponent);

export { BottomTabsComponentRedux as BottomTabsComponent };
