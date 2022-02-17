import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import ArrowBackIcon from '&assets/images/icons/arrow-back.svg';

import { RootState } from '&store/store';
import { SourceContainer } from '&styled/content/sourceContainer.styled';
import { ContentPlaceHolder } from '&styled/loaders/contentLoader.styled';
import { sourcesActions } from './sources.slice';
import { landingActions } from '../landing/landing.slice';
import { AppBar } from '&app/components/styled/appBar.styled';

const { width } = Dimensions.get('window');

type ReduxProps = ConnectedProps<typeof connector>;

const SourcesComponent = (props: ReduxProps) => {
  const { getSourcesApi, sources, pending, setLanding, setSources } = props;
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchData() {
      await getSourcesApi();
    }
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setLanding({ tabBarVisible: true });
    }, []),
  );

  const handleSourceClick = async (source) => {
    setLanding({ tabBarVisible: false });
    setSources({ selectedSource: source });
    navigation.navigate('Headlines');
  };

  return (
    <View style={styles.container}>
      <View style={styles.newsContainer}>
        <AppBar title={'Sources'} />
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {pending ? (
            <View>
              <View>
                <ContentPlaceHolder width={width} height={120} />
                <ContentPlaceHolder width={width} height={120} />
                <ContentPlaceHolder width={width} height={120} />
                <ContentPlaceHolder width={width} height={120} />
                <ContentPlaceHolder width={width} height={120} />
              </View>
            </View>
          ) : (
            sources?.sources?.map((source: any, index: number) => {
              return (
                <SourceContainer
                  source={source}
                  key={index}
                  handleClick={() => {
                    handleSourceClick(source);
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
  sources: state.sources.sources,
  pending: state.sources.pending,
});

const mapDispatchToProps = {
  getSourcesApi: sourcesActions.getSourcesApi,
  setLanding: landingActions.setLanding,
  setSources: sourcesActions.setSources,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
const SourcesComponentRedux = connector(SourcesComponent);

export { SourcesComponentRedux as SourcesComponent };
