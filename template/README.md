# Rents

![Logo](docs/images/RentsLogo.png)

## Description

- Rents (**Re**act **N**ative **T**ype**S**cript), Using the Object oritented principles, type safety, and the cool features that typescript provide us

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
