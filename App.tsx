import React from 'react';
import { enableScreens } from 'react-native-screens';

import { ExamplesNavigator } from '&features/examples.navigator';

enableScreens();

const App = () => {
  return <ExamplesNavigator />;
};

export { App };
