import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { reduxActions } from './redux.slice';

const ReduxComponent = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.conatiner}>
      <Text>{t('redux:REDUX_PAGE_TITLE')}</Text>
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
  logout: reduxActions.reset,
};

/**
 * Connects component to redux store
 */
const connector = connect(mapStateToProps, mapDispatchToProps);
const ReduxComponentRedux = connector(ReduxComponent);

export { ReduxComponentRedux as ReduxComponent };
