import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { ArticleComponent } from '&features/article/article.component';
import { HeadlinesComponent } from '&features/headlines/headlines.component';
import { BottomTabsComponent } from '&features/bottomTabs';

const { Navigator, Screen } = createNativeStackNavigator();

const ExamplesNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false, stackAnimation: 'fade' }}>
        <Screen name="Landing" component={BottomTabsComponent} />
        <Screen
          name="Article"
          component={ArticleComponent}
          options={{ headerShown: false, stackAnimation: 'slide_from_right' }}
        />
        <Screen
          name="Headlines"
          component={HeadlinesComponent}
          options={{ headerShown: false, stackAnimation: 'slide_from_right' }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export { ExamplesNavigator };
