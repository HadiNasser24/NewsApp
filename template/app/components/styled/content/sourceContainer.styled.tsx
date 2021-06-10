import React from 'react';
import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native';

import LinkIcon from '&assets/images/icons/link.svg';

import { colorPalette } from '&app/config/colors';
import {
  SubTitle,
  Title,
  TitleBlue,
} from '&app/components/styled/titles/titles.styled';

interface SourceProps {
  /** source  */
  source: {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
  };

  handleClick: Function;
}

export const SourceContainer = (props: SourceProps) => {
  const { source, handleClick } = props;
  return (
    <TouchableOpacity onPress={handleClick} style={styles.sourcesContainer}>
      <View style={styles.title}>
        <View style={styles.sourceTitle}>
          <Title text={source?.name} styled={styles.sourceName} />
          <SubTitle text={source?.category} styled={styles.sourceCategory} />
        </View>
        <SubTitle text={source?.language} />
      </View>
      <View style={styles.title}>
        <SubTitle
          text={
            source?.description?.length > 100
              ? `${source?.description.substr(0, 100)}...`
              : source?.description
          }
          styled={styles.sourceDescription}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(source?.url);
        }}
        style={styles.sourceLink}>
        <LinkIcon width={20} heigth={20} />
        <TitleBlue text={source?.url} styled={styles.sourceLinkName} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sourceCategory: {
    fontSize: 14,
    opacity: 0.7,
  },

  sourceDescription: {
    fontSize: 15,
    marginTop: 10,
    textAlign: 'left',
  },

  sourceLink: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },

  sourceLinkName: {
    fontSize: 16,
  },

  sourceName: { fontSize: 17, textAlign: 'left' },

  sourceTitle: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
  },

  sourcesContainer: {
    backgroundColor: colorPalette.white,
    borderColor: colorPalette.darkNavy01,
    borderRadius: 10,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 5,
    padding: 10,
    width: '100%',
  },

  title: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
