import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Share,
  ToastAndroid,
  Alert,
} from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import Clipboard from '@react-native-community/clipboard';
import { useNavigation } from '@react-navigation/native';
import Moment from 'moment';

import ShareIcon from '&assets/images/icons/share.svg';
import CopyIcon from '&assets/images/icons/copy.svg';
import ArrowBackIcon from '&assets/images/icons/arrow-back.svg';

import { RootState } from '&store/store';
import {
  SubTitle,
  Title,
  TitleBlue,
} from '&app/components/styled/titles/titles.styled';
import { colorPalette } from '&app/config/colors';
import { AppBar } from '&app/components/styled/appBar.styled';
import { landingActions } from '../landing/landing.slice';

type ReduxProps = ConnectedProps<typeof connector>;

const ArticleComponent = (props: ReduxProps) => {
  const { article } = props;
  const navigation = useNavigation();

  const CopyToClipBoard = (url: string) => {
    Clipboard.setString(url);
    ToastAndroid.show('copied!', ToastAndroid.SHORT);
  };

  const handleShareArticale = async (url: any) => {
    try {
      await Share.share({
        message: url,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.newsContainer}>
        <AppBar
          title={'Article'}
          leftIcon={<ArrowBackIcon />}
          handleLeftIconPress={() => {
            navigation.goBack();
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <ImageBackground
            source={{ uri: article?.urlToImage }}
            style={styles.articleImage}>
            <TouchableOpacity
              style={styles.icons}
              onPress={() => {
                handleShareArticale(article?.url);
              }}>
              <ShareIcon width={25} height={25} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icons}
              onPress={() => {
                CopyToClipBoard(article?.url);
              }}>
              <CopyIcon width={25} height={25} />
            </TouchableOpacity>
          </ImageBackground>
          <View style={styles.content}>
            <Title text={article?.title} styled={styles.articleTitle} />
            <SubTitle
              text={`${Moment(article?.publishedAt).format(
                'd MMM YYYY',
              )} at ${Moment(article?.publishedAt).format('HH:MM a')}`}
              styled={styles.articleAuthor}
            />
            <SubTitle
              text={`By ${article?.author}`}
              styled={styles.articleAuthor}
            />
            <TitleBlue
              text={article?.source?.name}
              styled={styles.articleSource}
            />
            <SubTitle text={article?.content} styled={styles.articleContent} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  articleAuthor: {
    marginTop: 10,
    opacity: 0.7,
    textAlign: 'left',
  },
  articleContent: {
    letterSpacing: 0.5,
    lineHeight: 25,
    marginTop: 15,
    textAlign: 'left',
  },
  articleImage: {
    display: 'flex',
    flexDirection: 'row',
    height: 200,
    justifyContent: 'flex-end',
    width: '100%',
  },
  articleSource: {
    marginTop: 10,
    textAlign: 'left',
  },
  articleTitle: {
    textAlign: 'left',
  },
  container: {
    alignItems: 'center',
    flex: 1,
  },
  content: { padding: 10 },
  icons: {
    alignItems: 'center',
    backgroundColor: colorPalette.white,
    borderRadius: 50,
    height: 35,
    justifyContent: 'center',
    marginHorizontal: 10,
    marginTop: 5,
    width: 35,
  },
  newsContainer: {
    backgroundColor: 'rgb(237, 233, 234)',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
});

const mapStateToProps = (state: RootState) => ({
  article: state.landing.selectedArticle,
});

const mapDispatchToProps = {
  setLanding: landingActions.setLanding,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
const ArticleComponentRedux = connector(ArticleComponent);

export { ArticleComponentRedux as ArticleComponent };
