import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import ArrowBackIcon from '&assets/images/icons/arrow-back.svg';

import { RootState } from '&store/store';
import { ContentPlaceHolder } from '&styled/loaders/contentLoader.styled';
import { NewsContainer } from '&styled/content/newsContainer.styled';
import { headlinesActions } from './headlines.slice';
import { landingActions } from '../landing/landing.slice';
import { AppBar } from '&app/components/styled/appBar.styled';
import { getCurrentTimeStamp } from '&app/utils/general';

const { width } = Dimensions.get('window');

type ReduxProps = ConnectedProps<typeof connector>;

const HeadlinesComponent = (props: ReduxProps) => {
  const {
    getSourceHeadlines,
    headlines,
    pending,
    setLanding,
    selectedtSource,
    viewedHistory,
  } = props;
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      setLanding({ tabBarVisible: true });
    }, []),
  );

  useEffect(() => {
    async function fetchData() {
      await getSourceHeadlines(selectedtSource.id);
    }
    fetchData();
  }, []);

  const handleArticleClick = async (article: any) => {
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
      <View style={styles.newsContainer}>
        <AppBar
          title={selectedtSource.name}
          leftIcon={<ArrowBackIcon />}
          handleLeftIconPress={() => {
            navigation.goBack();
          }}
        />
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
            headlines?.articles?.map((article: any, index: number) => {
              return (
                <NewsContainer
                  article={article}
                  from={''}
                  key={index}
                  handleClick={() => {
                    handleArticleClick(article);
                  }}
                />
              );
            })
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },

  newsContainer: {
    backgroundColor: 'rgb(237, 233, 234)',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
  },
});

const mapStateToProps = (state: RootState) => ({
  headlines: state.headlines.headlines,
  pending: state.headlines.pending,
  selectedtSource: state.sources.selectedSource,
  viewedHistory: state.landing.viewedHistory,
});

const mapDispatchToProps = {
  getSourceHeadlines: headlinesActions.getSourceHeadlinesApi,
  setLanding: landingActions.setLanding,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
const HeadlinesComponentRedux = connector(HeadlinesComponent);

export { HeadlinesComponentRedux as HeadlinesComponent };
