import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { RootState } from '&store/store';
import { ContentPlaceHolder } from '&styled/loaders/contentLoader.styled';
import { Title } from '&app/components/styled/titles/titles.styled';
import { NewsContainer } from '&styled/content/newsContainer.styled';
import { landingActions } from './landing.slice';
import { historyActions } from '../history/history.slice';
import { getCurrentTimeStamp } from '&app/utils/general';
import { colorPalette } from '&app/config/colors';

const { width } = Dimensions.get('window');

type ReduxProps = ConnectedProps<typeof connector>;

const LandingComponent = (props: ReduxProps) => {
  const {
    getNewsInfo,
    news,
    pending,
    setLanding,
    viewedHistory,
    setHistory,
  } = props;
  const navigation = useNavigation();
  const [SlideInLeft, setSlideInLeft] = useState(new Animated.Value(0));

  useFocusEffect(
    React.useCallback(() => {
      setLanding({ tabBarVisible: true });
    }, []),
  );

  useEffect(() => {
    async function fetchData() {
      await getNewsInfo('business AND sports AND (eg OR ua)');
    }
    fetchData();
  }, []);

  useEffect(() => {
    return Animated.parallel([
      Animated.timing(SlideInLeft, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleArticleClick = async (article) => {
    setLanding({ tabBarVisible: false, selectedArticle: article });

    const timestamp = getCurrentTimeStamp();
    let history = Object.assign({}, article);
    history.timestamp = timestamp;

    if (viewedHistory.length === 0 || viewedHistory === null) {
      const insertedItem = [];
      insertedItem.push(history);
      setLanding({ viewedHistory: insertedItem });
    } else {
      setLanding({ viewedHistory: [...viewedHistory, history] });
    }
    navigation.navigate('Article');
  };

  return (
    <View style={styles.container}>
      <View style={styles.btn} />
      <Animated.View
        style={[
          styles.newsContainer,
          {
            transform: [
              {
                translateY: SlideInLeft.interpolate({
                  inputRange: [0, 1],
                  outputRange: [600, 0],
                }),
              },
            ],
          },
        ]}>
        <Title text="Top Headlines" styled={styles.headlinesTitle} />
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {pending ? (
            <View>
              <View>
                <ContentPlaceHolder width={width} height={200} />
                <ContentPlaceHolder width={width} height={200} />
                <ContentPlaceHolder width={width} height={200} />
              </View>
            </View>
          ) : (
            news?.articles?.map((article: any, index: number) => {
              return (
                <NewsContainer
                  article={article}
                  key={index}
                  handleClick={() => {
                    handleArticleClick(article);
                  }}
                />
              );
            })
          )}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignItems: 'flex-end',
    borderRadius: 6,
    display: 'flex',
    height: 40,
    marginTop: 29,
    padding: 20,
    width: '100%',
  },

  container: {
    alignItems: 'center',
    backgroundColor: colorPalette.darkNavy1,
    flex: 1,
  },

  headlinesTitle: {
    fontSize: 20,
    marginVertical: 5,
    textAlign: 'center',
  },

  newsContainer: {
    backgroundColor: 'rgb(237, 233, 234)',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    padding: 10,
    width: '100%',
  },
});

const mapStateToProps = (state: RootState) => ({
  news: state.landing.news,
  pending: state.landing.pending,
  viewedHistory: state.landing.viewedHistory,
});

const mapDispatchToProps = {
  logout: landingActions.reset,
  getNewsInfo: landingActions.getNewsInfoApi,
  setLanding: landingActions.setLanding,
  setHistory: historyActions.setHistory,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
const LandingComponentRedux = connector(LandingComponent);

export { LandingComponentRedux as LandingComponent };
