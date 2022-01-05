import React, { useState } from 'react';

import {
  View,
} from 'react-native';

import { styleSheetFactory } from '../themes/themes';
import { useTheme } from 'react-native-themed-styles';
import { EnhancedPlatform } from 'react-native-platforms'

import CoolMiniOrNotPost from '../models/CoolMiniOrNotPost';
import CoolMiniOrNotPostDetails from './CoolMiniOrNotPostDetails';
import CoolMiniOrNotPostTitle from './CoolMiniOrNotPostTitle';
import CoolMiniOrNotImageView from './CoolMiniOrNotImageView';

import Dimensions from '../themes/dimensions';

interface CoolMiniOrNotPostContainerProps {
  post: CoolMiniOrNotPost;
  width: number; 
  onAddToAlbumPress?: (post: CoolMiniOrNotPost) => void;
}

const CoolMiniOrNotPostContainer = ({ post, width, onAddToAlbumPress }: CoolMiniOrNotPostContainerProps) => {
  const [styles] = useTheme(themedStyles);

  return (
    <View>
      <View style={[styles.container, { width: width - 2 * Dimensions.margin.default || 1000}]} >
        <CoolMiniOrNotPostTitle post={post}/>
        <CoolMiniOrNotImageView post={post} />
        <CoolMiniOrNotPostDetails post={post} onAddToAlbumPress={onAddToAlbumPress}/>
      </View>
    </View>
  )
}

const themedStyles = styleSheetFactory(theme => ({
  container: {
    backgroundColor: theme.colors.highlightPrimary,
    //Padding/Margin
    padding: 10,
    marginBottom: 15,
    //Border
    borderRadius: 4,
    borderWidth: 3,
    borderColor: theme.colors.highlightSecondary,
    // Shadow
    shadowColor: theme.colors.shadow,
    shadowRadius: 8,
    shadowOpacity: 1,
    shadowOffset: { width: 10, height: 7},

    //minHeight: 300
  },
}));

export default CoolMiniOrNotPostContainer;