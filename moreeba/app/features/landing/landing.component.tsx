import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { SquareCard } from '&styled/cards/squareCard.styled';
import AreebaLogo from '&assets/images/landing/areeba_logo.svg';
import RentsLogo from '&assets/images/landing/rents_logo.svg';
import FormsLogo from '&assets/images/landing/form.png';
import ApiLogo from '&assets/images/landing/api.png';
import ReduxLogo from '&assets/images/landing/redux.png';
import DatabaseLogo from '&assets/images/landing/database.png';
import { landingActions } from './landing.slice';

const { width } = Dimensions.get('window');

const LandingComponent = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const data = [
    {
      label: t('landing:FORMS_PAGE_TITLE'),
      action: () => {
        navigation.navigate('Forms');
      },
      icon: FormsLogo,
    },
    {
      label: t('landing:API_PAGE_TITLE'),
      action: () => {
        navigation.navigate('Api');
      },
      icon: ApiLogo,
    },
    {
      label: t('landing:LOCAL_STORAGE_PAGE_TITLE'),
      action: () => {
        navigation.navigate('LocalStorage');
      },
      icon: DatabaseLogo,
    },
    {
      label: t('landing:REDUX_TITLE'),
      action: () => {
        navigation.navigate('Redux');
      },
      icon: ReduxLogo,
    },
  ];
  const colNum = data.length / 2;

  const changeLanguageEn = () => {
    i18n.changeLanguage('en');
  };

  const changeLanguageAr = () => {
    i18n.changeLanguage('ar');
  };

  const renderItems = ({ item }: any) => {
    return (
      <View style={{ flex: 1 / colNum }}>
        <SquareCard length={width * 0.5 - 2} onPress={item.action}>
          <Image source={item.icon} />
          <Text>{item.label}</Text>
        </SquareCard>
      </View>
    );
  };

  return (
    <View style={styles.conatiner}>
      <View style={styles.upperHalf}>
        <RentsLogo />
      </View>
      <View style={styles.lowerHalf}>
        <FlatList
          numColumns={colNum}
          data={data}
          renderItem={renderItems}
          keyExtractor={({ label }) => label}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            changeLanguageEn();
          }}>
          <Text style={styles.text}>{t('landing:ENGLISH_BUTTON')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            changeLanguageAr();
          }}>
          <Text style={styles.text}>{t('landing:ARABIC_BUTTON')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text>By</Text>
        <AreebaLogo />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fc799a',
    borderRadius: 10,
    padding: 10,
    width: '40%',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop: 20,
  },
  conatiner: {
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lowerHalf: {
    flex: 0.6,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
  },
  upperHalf: {
    alignItems: 'center',
    flex: 0.3,
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
  logout: landingActions.reset,
};

/**
 * Connects component to redux store
 */
const connector = connect(mapStateToProps, mapDispatchToProps);
const LandingComponentRedux = connector(LandingComponent);

export { LandingComponentRedux as LandingComponent };
