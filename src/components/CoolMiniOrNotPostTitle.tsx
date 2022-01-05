import React from "react";

import { View, StyleSheet, Text } from "react-native";
import CoolMiniOrNotPost from "../models/CoolMiniOrNotPost";

import { styleSheetFactory } from '../themes/themes';
import { useTheme } from 'react-native-themed-styles';

interface CoolMiniOrNotPostTitleProps {
  post: CoolMiniOrNotPost
}

const CoolMiniOrNotPostTitle = ({ post }: CoolMiniOrNotPostTitleProps) => {
  const [styles] = useTheme(themedStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.artist} >by {post.artist}</Text>
    </View>
  )
}

const themedStyles = styleSheetFactory(theme => ({
  container: {
    marginBottom: theme.dimension.margin.default,
    flex: 1
  },
  title: {
    fontSize: theme.dimension.font.normal,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  artist: {
    fontSize: theme.dimension.font.small,
    color: theme.colors.text,
  }
}));

export default CoolMiniOrNotPostTitle;