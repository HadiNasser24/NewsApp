import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Loader } from '&styled/loaders/loader.styled';
import { apiActions } from './api.slice';

const ApiComponent = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.conatiner}>
      <Loader visible={true} />
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
  logout: apiActions.reset,
};

/**
 * Connects component to redux store
 */
const connector = connect(mapStateToProps, mapDispatchToProps);
const ApiComponentRedux = connector(ApiComponent);

export { ApiComponentRedux as ApiComponent };
