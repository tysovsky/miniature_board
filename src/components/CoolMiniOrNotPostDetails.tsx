import React from "react";

import { styleSheetFactory } from '../themes/themes';
import { useTheme } from 'react-native-themed-styles';

import { View, TouchableHighlight, Text } from "react-native";
import CoolMiniOrNotPost from "../models/CoolMiniOrNotPost";

interface CoolMiniOrNotPostDetailsProps {
  post: CoolMiniOrNotPost;
  onAddToAlbumPress?: (post: CoolMiniOrNotPost) => void;
}

const CoolMiniOrNotPostDetails = ({ post, onAddToAlbumPress }: CoolMiniOrNotPostDetailsProps) => {
  const [styles] = useTheme(themedStyles);

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Text style={styles.text}>Score: {post.score}</Text>
        <Text style={styles.text}>Votes: {post.votes}</Text>
      </View>
      <TouchableHighlight style={styles.saveButton} onPress={() => onAddToAlbumPress && onAddToAlbumPress(post)}>
        <Text style={styles.saveButtonText}>Add to album</Text>
      </TouchableHighlight>
    </View>
  )
}

const themedStyles = styleSheetFactory(theme => ({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: theme.dimension.margin.default,
  },
  details: {
    flex: 1,
    flexDirection: 'column'
  },
  text: {
    color: theme.colors.text,
    fontSize: theme.dimension.font.normal,
  },
  saveButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.dimension.padding.default,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: theme.colors.highlightSecondary,
  },
  saveButtonText: {
    color: theme.colors.text,
  }
}));

export default CoolMiniOrNotPostDetails;