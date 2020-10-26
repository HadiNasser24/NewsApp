import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { LandingComponent } from '&features/landing/landing.component';
import { FormsComponent } from '&features/forms/forms.component';
import { ApiComponent } from '&features/api/api.component';
import { LocalStorageComponent } from '&features/localStorage/localStorage.component';
import { ReduxComponent } from '&features/redux/redux.component';

const { Navigator, Screen } = createNativeStackNavigator();

const ExamplesNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false, stackAnimation: 'fade' }}>
        <Screen name="Landing" component={LandingComponent} />
        <Screen name="Forms" component={FormsComponent} />
        <Screen name="Api" component={ApiComponent} />
        <Screen name="LocalStorage" component={LocalStorageComponent} />
        <Screen name="Redux" component={ReduxComponent} />
      </Navigator>
    </NavigationContainer>
  );
};

export { ExamplesNavigator };
