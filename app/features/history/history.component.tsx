import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import ArrowBackIcon from '&assets/images/icons/arrow-back.svg';

import { RootState } from '&store/store';
import { NewsContainer } from '&styled/content/newsContainer.styled';
import { landingActions } from '../landing/landing.slice';
import { AppBar } from '&app/components/styled/appBar.styled';
import { Title } from '&app/components/styled/titles/titles.styled';

type ReduxProps = ConnectedProps<typeof connector>;

const HistoryComponent = (props: ReduxProps) => {
  const { viewedHistory, setLanding } = props;
  const navigation = useNavigation();
  const [history, setHistory] = useState(viewedHistory);

  useFocusEffect(
    React.useCallback(() => {
      setLanding({ tabBarVisible: true });
    }, []),
  );

  useEffect(() => {
    let latestViewed = viewedHistory
      .slice()
      .sort((a, b) => b.timestamp - a.timestamp);

    setHistory(latestViewed);
  }, [viewedHistory]);

  const handleArticleClick = async (article: any) => {
    setLanding({ tabBarVisible: false, selectedArticle: article });
    navigation.navigate('Article');
  };

  return (
    <View style={styles.container}>
      <View style={styles.newsContainer}>
        <AppBar title={'History'} />
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {history?.length === 0 ? (
            <View>
              <View>
                <Title text={'No history recorded'} />
              </View>
            </View>
          ) : (
            history?.map((article: any, index: number) => {
              return (
                <NewsContainer
                  article={article}
                  from={'history'}
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
  viewedHistory: state.landing.viewedHistory,
});

const mapDispatchToProps = {
  setLanding: landingActions.setLanding,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
const HistoryComponentRedux = connector(HistoryComponent);

export { HistoryComponentRedux as HistoryComponent };
