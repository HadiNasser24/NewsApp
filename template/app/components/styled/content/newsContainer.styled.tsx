import React from 'react';
import {
  View,
  Share,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import Moment from 'moment';
import Clipboard from '@react-native-community/clipboard';

import ShareIcon from '&assets/images/icons/share.svg';
import CopyIcon from '&assets/images/icons/copy.svg';

import { colorPalette } from '&app/config/colors';
import { SubTitle, Title } from '&app/components/styled/titles/titles.styled';

interface NewsProps {
  /** articles  */
  article: {
    source: {
      name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  };

  handleClick: Function;

  from: string;
}

const CopyToClipBoard = (url: string) => {
  Clipboard.setString(url);
  ToastAndroid.show('copied!', ToastAndroid.SHORT);
};

const handleShareArticale = async (article: any) => {
  try {
    await Share.share({
      message: article.url,
    });
  } catch (error) {
    Alert.alert(error.message);
  }
};

export const NewsContainer = (props: NewsProps) => {
  const { article, handleClick, from } = props;

  return (
    <TouchableOpacity onPress={handleClick} style={styles.articleContainer}>
      <Image source={{ uri: article?.urlToImage }} style={styles.newsImage} />
      <View>
        <View style={styles.newsContext}>
          <Title
            text={
              article?.title.length > 50
                ? `${article?.title.substr(0, 50)}...`
                : article?.title
            }
            styled={styles.newsTitle}
          />
          <SubTitle
            text={
              article?.content?.length > 75
                ? `${article?.content.substr(0, 75)}...`
                : article?.content
            }
            styled={styles.newsDescription}
          />
        </View>
        <View style={styles.newsInfo}>
          <Title
            text={
              article?.source?.name.length > 12
                ? `${article?.source?.name.substr(0, 9)}...`
                : article?.source?.name
            }
            styled={styles.newsSourceName}
          />
          {from === 'history' ? (
            <SubTitle
              text={`Viewed at ${Moment(new Date(article?.timestamp)).format(
                'DD MMM YYYY HH:mm a',
              )}`}
              styled={styles.newsSourceName}
            />
          ) : (
            <SubTitle
              text={`${Moment(article?.publishedAt).format(
                'DD MMM YYYY',
              )} at ${Moment(article?.publishedAt).format('HH:mm a')}`}
              styled={styles.newsSourceName}
            />
          )}

          <TouchableOpacity
            onPress={() => {
              handleShareArticale(article);
            }}>
            <ShareIcon width={20} height={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              CopyToClipBoard(article.url);
            }}>
            <CopyIcon width={20} height={20} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  articleContainer: {
    backgroundColor: colorPalette.white,
    borderColor: colorPalette.darkNavy2,
    borderRadius: 10,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 10,
    width: '100%',
  },

  newsContext: {
    padding: 10,
  },

  newsDescription: { fontSize: 14, textAlign: 'left' },

  newsImage: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 160,
    width: '100%',
  },

  newsInfo: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },

  newsSourceName: {
    fontSize: 13,
  },

  newsTitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'left',
  },
});
