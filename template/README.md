# Rents

![Logo](docs/images/RentsLogo.png)

## Description

- Rents (**Re**act **N**ative **T**ype**S**cript), Using the Object oritented principles, type safety, and the cool features that typescript provide us

## Table of content

- [Commands](#markdown-header-commands)
- [How to run](#markdown-header-how-to-run)
    - [Android](#markdown-header-android)
    - [iOs](#markdown-header-ios)
- [Structure](#markdown-header-structure)
    - [components](#markdown-header-components)
    - [containers](#markdown-header-containers)
    - [components/styled](#markdown-header-components-styled)
    - [assets](#markdown-header-assets)
    - [api](#markdown-header-api)
    - [hooks](#markdown-header-hooks)
    - [redux](#markdown-header-redux)
        - [redux/actions](#markdown-header-redux-actions)
        - [redux/reducers](#markdown-header-redux-reducers)
        - [redux/constants](#markdown-header-redux-constants)
    - [utils](#markdown-header-utils)
    - [config](#markdown-header-config)
    - [cli](#markdown-header-cli)
- [Coding Conventions](#markdown-header-coding-conventions)
- [Features](#markdown-header-features)
- [Suggestions](#markdown-header-suggestions)
    - [VS-Code extentions](#markdown-header-vs-code-extentions)
    - [Learning Resources](#markdown-header-learning-resources)

## Commands

|         command          |                        action                        |
| :----------------------: | :--------------------------------------------------: |
| `yarn` or `yarn install` |              Download the dependencies               |
|       `yarn start`       |                  Start the bundler                   |
|      `yarn android`      |    Run a debugging version of the app on android     |
|   `yarn android:clean`   |              Clean the android project               |
|   `yarn android:build`   |                Creates a release apk                 |
|        `yarn ios`        |      Run a debugging version of the app on iOS       |
|    `yarn ios:install`    | Excuted the pod install command in the ios directory |
|      `cli:install`       |            Download the cli dependencies             |
|       `cli:create`       |           Create a file using the cli tool           |
|       `yarn lint`        |                   Analyse the code                   |
|       `yarn link`        |   Copies your resources to android and ios folder    |

## How to run

#### Android

- At root directory run `yarn` or `yarn install` to install the dependencies.
- In the `android` directory rename `local.properties.example` to `local.properties` and replace the dummy location of the sdk.dir in `local.properties` with the sdk location on your machine or remove this file if the sdk is in your environemnt variables under the name ANDROID_SDK_ROOT
- Rename `gradle.properties.example` to `gradle.properties`

#### iOS

- Run `yarn ios:install`.
- Then run `yarn ios` to run the project on iOS device.


## Structure

The project root directory structure is as follows:

```
  '|-- <root>',
  '    |-- cli',
  '    |-- public',
  '    |-- readme',
  '    |-- src',
  '        |-- assets',
  '        |-- config',
  '        |-- features',
  '        |   |-- demo',
  '        |       |-- home',
  '        |       |-- landing',
  '        |       |-- login',
  '        |-- locales',
  '        |-- route',
  '        |-- store',
  '        |-- styled',
  '        |-- utils',
  ''
```
As mentioned before, following the "features" or "ducks" pattern organizes the folders in the following manner: 

* [`/cli`](cli)         for the interactive cli that generates project template files.
* [`/public`](public)         for public files
* [`/readme`](readme)         for assets used in [`README.md`](README.md)
* [`/src`](src)            for all source files
* [`src/assets`](src/assets)      for assets (.png, .svg, etc ...)
* [`src/config`](src/config)      for configuration files (colors, headers, strings, etc ...)
* [`src/features`](src/features)    for project features (login, register, dashboard, settings ...)
* [`src/locales`](src/locales)       for i18n localization files (en, ar ...)
* [`src/roure`](src/route)       for router middlewares (protectedRoutes ...)
* [`src/store`](src/store)       for redux configurations (combineReducers, middlewares, persist etc ...)
* [`src/styled`](src/styled)      for multiple use stateless styled components 
* [`src/utils`](src/utils)      for utils used throughout the project 

#### features

As opposed to dividing files into `containers` for logic and `components` for presentation then putting redux logic in a separate folder, this template couples logic, presentation and redux state for each feature separately. Thus, redux state is divided into "slices" where each slice is coupled with a feature. The template also imposes not using own props with connected components.

For example, a login feature contains a slice of the redux state to manage credentials and session, and a component for presenting and submitting the form. 

Example

```ts
// localStorage.slice.tsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { LocalStorage } from './localStorage.type';

/**
 * Initial state object
 */
const initialState: LocalStorage = {};

/**
 * Thunks are used to dispatch actions that return functions rather than objects,
 * usually used for making api calls or dispatching async actions.
 * Thunks are dispatched in the same way regular actions are dispatched.
 * A slice can have multiple thunks
 */
const makeLocalStorageApiCall = createAsyncThunk(
  // TODO change this method based on usecase
  // You can add as many thunks as required
  // Delete this method if not needed
  'localStorage/makeLocalStorageApiCallStatus',
  async (request: any) => {
    // Make your API call here
  },
);

/**
 * Feature slice Object
 * Automatically generates actions as per reducers
 */
const localStorageSlice = createSlice({
  /**
   * Unique feature name
   */
  name: 'redux',

  /**
   * Initial state object
   */
  initialState: initialState,

  /**
   * Reducers are functions that determine changes to an application's state.
   * They can have two forms:
   *
   * 1- Modify the state by providing key-value pairs, ex:
   *
   *    setCounter: (state, action) => {
   *      return { ...state, ...action.payload };
   *    }
   *
   * 2- Apply mutating logic to part of the state.
   *    Note that this is possible using 'Immer', ex:
   *
   *    decrementCounter: (state) => {
   *      state.value -= 1;
   *    }
   */
  reducers: {
    reset: () => initialState,
    // Add here reducers
    // ...
  },
  /**
   * Extra reducers are for handling action types.
   * Here thunk actions are handled
   */
  extraReducers: (builder) => {
    // TODO remove extraReducers if there are no thunks
    builder.addCase(makeLocalStorageApiCall.pending, (state, action) => {
      // Write pending logic here
    });
    builder.addCase(makeLocalStorageApiCall.fulfilled, (state, action) => {
      // Write success logic here
    });
    builder.addCase(makeLocalStorageApiCall.rejected, (state, action) => {
      // Write failure logic here
    });
  },
});

/**
 * Reducers are exported so they could be added to store
 */
export const localStorageReducer = localStorageSlice.reducer;

/**
 * Actions hold the same names as reducers.
 * Actions can be dispached using 'useDispacth' hook,
 * or by 'mapDispatchToProps' in the redux 'connect' function
 */
export const localStorageActions = { ...localStorageSlice.actions };


```

```ts

// localStorage.component.tsx
import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { localStorageActions } from './localStorage.slice';
import '&app/config/localize';

const LocalStorageComponent = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.conatiner}>
      <Text>{t('localStorage:LOCAL_PAGE_TITLE')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

/**
 * Maps state variables from redux store to props of currect component
 * @param state
 */
const mapStateToProps = (state: RootState) => ({
  // Map your redux state to your props here
});

/**
 * Maps actions from slices to props
 */
const mapDispatchToProps = {
  // map your actions here ex:
  // increment : counterActions.increment
  logout: localStorageActions.reset,
};

/**
 * Connects component to redux store
 */
const connector = connect(mapStateToProps, mapDispatchToProps);
const LocalStorageComponentRedux = connector(LocalStorageComponent);

export { LocalStorageComponentRedux as LocalStorageComponent };

```


#### styled components

`app/components/styled`

- Styled is the place where the repetitve components lives `app/components/styled`, when making a styled component make it as generic as possible so that it can be used in multiple screns.

Example:

```tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

interface Props {
  /** A text to be displayed in the center of this component */
  title: string;

  /** A text to be displayed on the Button */
  buttonTitle: string;

  /* adding '?' means this property is optional, and we'll handle the default behaviour */
  /** A function to be exectued when the button is pressed */
  buttonHandler?: () => void;
}

const CutsomButton = (props: Props) => {
  const { title, buttonHandler, buttonTitle } = props;

  /* If buttonHander is undefined use the default behaviour */
  const onPressButton =
    buttonHandler ||
    (() => {
      console.log(`pressed the ${buttonTitle} `);
    });

  return (
    <View style={styles.conatiner}>
      <Text>{title}</Text>
      <Button title={buttonTitle} onPress={() => onPressButton()} />
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export { CutsomButton };
```

#### assets

`app/assets`

##### Fonts
Put all of your fonts in the `app/assets/fonts` then run `yarn link` to add those fonts to the android and ios assets (we are running manual link since react native auto linking links the packages that are being downloaded by yarn). The path to fonts is specified in the `react-native.config.js` file.

##### Images
When dealing with images it is better to use svg format, to add an svg image simply import it
```js
import CardImg from '&assets/images/buttom_tab/cards.svg';
```

Then use it as a tsx tag

```jsx
<View>
  <HomeImg />;
</View>
```

If you want to change its colors you have to edit the svg, the `.svgrrc` contains the configuration on what properties we can replace

```json
{
  "replaceAttrValues": {
    "#000": "{props.fill}",
    "1": "{props.opacity}",
    "#FFF": "{props.stroke}",
  }
}
```

Edit the svg file, change the fill, stroke and/or opacity as needed.

Before:
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="none" viewBox="0 0 35 35">
    <g fill="#4B4B4B" stroke-width="2">
        <rect width="23" height="19" x="6" y="9" rx="2" />
        <rect width="23" height="14" x="6" y="14" rx="2" />
    </g>
</svg>
```

After:
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="none" viewBox="0 0 35 35">
    <g fill="#000" stroke-width="2">
        <rect width="23" height="19" x="6" y="9" rx="2" />
        <rect width="23" height="14" x="6" y="14" rx="2" />
    </g>
</svg>
```

After we changed the fill to `#000`, the svg transformer will replace all the occurance of `#000` with the provided fill property as below

```jsx
<HomeImg fill={'#FF0000'} />
```

#### api

`app/api`

- The folder that holds the api calles in details, we write the logic of the api call and export a simple function to be called easily in the container.

Example:

```js
import Axois from 'axios';

const getStarWarsCharacter = async (id: number) => {
  let result;
  try {
    result = await Axois.get(`https://swapi.dev/api/people/${id}/`);
  } catch (error) {
    result = {
      data: {
        error: 'Failed',
      },
    };
  }

  return result.data;
};

export { getStarWarsCharacter };
```

#### redux

`app/redux`

- We'll use redux as a global state managment, if you feel a state should be shared with multiple screens or components then save the state in redux, e.g: sharing the username with other screens.

Example:

- dispatch (set state)

```js
import { useDispatch } from 'react-redux';
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUsername(loadData('username')));
  }, [dispatch]);
.
.
.
```

- useSelector (get state)

```js
import { useSelector } from 'react-redux';

const HomeContainer = () => {
  const { username } = useSelector((state: any) => state.kyc);
.
.
.

```

#### redux actions

`app/redux/actions`

- Actions are payloads of information that send data from your application to your store. They are the only source of information for the store. You send them to the store using store. dispatch().

Example:

```js
import { KYC } from '../constants';

const setUsername = (username: string) => {
  return {
    type: KYC.SET_USERNAME,
    payload: username,
  };
};

export { setUsername };
```

#### redux reducers

`app/redux/reducers`

- Reducers specify how the application's state changes in response to action. The reducer is a function that takes the previous state and an action.

Example:

```js
import { KYC } from '../constants';

const initialState = {
  username: '',
  password: '',
};

const KycReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case KYC.SET_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    default:
      return state;
  }
};

export { KycReducer };
```

#### redux constants

`app/redux/constants`

- We define all the constancts (type of action) for consistency.

Example:

```js
export const SET_USERNAME = 'SET_USERNAME';
export const SET_PASSWORD = 'SET_PASSWORD';
```

#### realm

`app/realm`

- Realm is used for local storage, singleton pattern was used here to ensure we only have one and only one instance of this object throughout the whole app

Example:

- Store Data:

```tsx
import React, { useState } from 'react';

import { OnboardingComponent } from '&app/components/onboarding/onboarding.component';
import { storeData } from '&realm';

const OnboardingContainer = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const storeCredentials = () => {
    storeData({ username });
    storeData({ password });
  };

  return (
    <OnboardingComponent
      buttonHandler={() => {
        storeCredentials();
      }}
      buttonTitle="Click me!"
      onUsernameChange={(text) => setUsername(text)}
      onPasswordChange={(text) => setPassword(text)}
    />
  );
};

export { OnboardingContainer };
```

- Load Data

```js
import { isEmpty, loadData } from '&realm';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty()) {
      dispatch(setUsername(loadData('username')));
    }
  }, [dispatch]);
  .
  .
  .
  .
```

#### utils

`app/utils`

- Helper functions that might be useful for multiple files/containers, such as concatination of 2 json objects, hashing function, ...

#### hooks

- We place our custom hooks in this folder, but why do need a custom hooks in the first place? well hooks are similar to util functions (check [utils](#markdown-header-utils)), but the differnce is hooks are only used in react functional component, and also they are stateful, so when create a state in our custom hook and we update this state, it will trigger a rerender to the component.

Example on a custom hook creation:

```ts
import { useState } from 'react';

interface Response {
  data: any;
  loading: boolean;
  error: boolean;
}

const useApi = (fn: any): [Response, () => Promise<any>] => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const invoke = async () => {
    setLoading(true);
    try {
      const result = await fn();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // we'll return a tuple having the response info (data, loading, error) 
  // and a method that is ready to be called, the state will change when the invoke is called.
  return [{ data, loading, error }, invoke];
};

export { useApi };
```

Example on custom hooks usage:

```tsx
import React, { useEffect } from 'react';

import { ApiExampleComponent } from '&components/tabs/apiExample.component';
import { getStarWarsCharacter } from '&api/starWars';
import { useApi } from '&hooks/useFetchData';

const ApiExampleContainer = () => {
  const [response, sendRequest] = useApi(() => {
    return getStarWarsCharacter(1);
  });

  useEffect(() => {
    sendRequest();
  }, []);

  return response.loading ? null : (
    <ApiExampleComponent title="ApiExampleContainer" characterName={response.data?.name} />
  );
};

export { ApiExampleContainer };
```

#### config

`app/config`

- global projects configuration that will be used throught out the project, such as colors and strings.

#### cli

`cli`

- command line tool for generating styled component, component container, and containers.
- run `yarn cli:install` to download the cli dependencies then `yarn cli:create` to start the interactive cli.

## Coding Conventions

- The imports should be divided to 3 sections each are sperated with an empty line

1. imports from npm packages
2. imports from this project
3. imports assets

Example:

```js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeContainer } from '&containers/tabs/home.container';
import { ApiExampleContainer } from '&containers/tabs/apiExample.container';

import HomeImg from '&assets/images/buttom_tab/catalogue_main.svg';
import CardImg from '&assets/images/buttom_tab/cards.svg';
```

- Your code should be seperated into related chunks sperated by an empty line

Example:

```js
const OnboardingContainer = () => {
  /* Section for states declaration */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  /* local utils section */
  const storeCredentials = () => {
    storeData({ username });
    storeData({ password });
  };

  /* Return section */
  return (
    <OnboardingComponent
      buttonHandler={() => {
        storeCredentials();
      }}
      buttonTitle="Click me!"
      onUsernameChange={(text) => setUsername(text)}
      onPasswordChange={(text) => setPassword(text)}
    />
  );
};
```

- Always use single quoutes for strings in javascript/typescript blocks (imports, curly braces blocks, ...)

Example:

```tsx
/* Imports are single qoutes */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeContainer } from '&containers/tabs/home.container';
import { ApiExampleContainer } from '&containers/tabs/apiExample.container';

import HomeImg from '&assets/images/buttom_tab/catalogue_main.svg';
import CardImg from '&assets/images/buttom_tab/cards.svg';

const { Navigator, Screen } = createBottomTabNavigator();

const Landing = () => {
  const options = ({ route }: any) => ({
    tabBarIcon: ({ focused, color }: any) => {
      const opacity = focused ? '1' : '.3';
      switch (route.name) {
        case 'Home' /* js/ts string => single quotes */:
          return <HomeImg fill={color} opacity={opacity} />;
        case 'ApiExample':
          return <CardImg stroke={color} opacity={opacity} />;
        default:
          return null;
      }
    },
  });

  const tabBarOptions = {
    /* js/ts string => single quotes */
    activeTintColor: '#9E1C96',
    inactiveTintColor: '#000000',
    showLabel: false,
  };

  return (
    <Navigator screenOptions={options} tabBarOptions={tabBarOptions} backBehavior="initialRoute">
      {/* not a js/ts string => double quotes */}
      <Screen name="Home" component={HomeContainer} />
      {/* js/ts string => single quotes */}
      <Screen name={'ApiExample'} component={ApiExampleContainer} />
    </Navigator>
  );
};

export { Landing };
```

- Always use Arrow function syntax

```ts
// Accepted
const add = (a: number, b: number) => {
  return a + b;
};

// Rejected
function add(a: number, b: number) {
  return a + b;
}
```

- Use async/await not promises

```ts
// Simple and clean
const apiCall = async (url, body) => {
  try {
    return await axios.get(url, body);
  } catch (err) {
    throw err;
  }
};

// Complicated and hard to follow
const apiCall = (url, body) => {
  axios
    .get(url, body)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (err) throw err;
    });
};
```

- Document your work, so that other developers could use your code without the need to read it line by line

```ts
// Now when other developers in your team import this component, the ide will suggest those fields
// and the description that you provided for each field will be shown.
interface Props {
  /** A text to be displayed in the center of this component */
  title?: string;

  /** A text to be displayed on the button */
  buttonTitle: string;

  /** A function to be invoked when the button is pressed */
  buttonHandler: () => void;

  /** on username change */
  onUsernameChange: (text: string) => void;

  /** on password change */
  onPasswordChange: (text: string) => void;
}

const OnboardingComponent = (props: Props) => {
  .
  .
  .
}

export { OnboardingComponent };
```

- Use named export not export default

```js
// Accepted
export { TitleBar };

// Rejected
export default TitleBar;
```

## Features

- redux global state managment
- realm local storage
- cli tool for files generation
- path alias
- using typescirpt instead of javascript

## Suggestions

#### vs code extentions

- Bable JavaScript
- DotENV
- ESLint
- Git Blame
- GitLense - Get supercharged
- JavaScript (ES6) code snippets
- npm
- npm Intellisense
- Path intellisense
- Pritter - Code formatter
- Visual Studio intelliCode
- yarn
- Todo Tree
- Better comments

#### Learing Resources

- [Learn React native - Video](https://youtu.be/Hf4MJH0jDb4)
- [TypeScript - The Basics - Video](https://youtu.be/ahCwqrYpIuM)
- [TypeScirpt clean code - Article](https://github.com/labs42io/clean-code-typescript)
- [Create custom hooks - Article](https://reactjs.org/docs/hooks-custom.html)
