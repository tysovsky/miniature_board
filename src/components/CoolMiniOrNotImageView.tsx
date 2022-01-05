import React from 'react';

import {
  StyleSheet,
} from 'react-native';

import useGetCoolMiniOrNotFullImageUrl from '../hooks/useGetCoolMiniOrNotFullResImageUrl';
import CoolMiniOrNotPost from '../models/CoolMiniOrNotPost';
import LoadingIndicator from './LoadingIndicator';
import ImageView from './ImageView';

interface CoolMiniOrNotImageViewProps {
  post: CoolMiniOrNotPost;
}

const CoolMiniOrNotImageView = ({ post }: CoolMiniOrNotImageViewProps) => {
  const [loading, imageUrl] = useGetCoolMiniOrNotFullImageUrl(post.id);

  if (!loading && imageUrl.length > 0) {
    return (
      <ImageView source={imageUrl}/>
    )
  }
  else{
    return <LoadingIndicator/>
  }
}

const styles = StyleSheet.create({
  image: {
    width: 500
  }
});

export default CoolMiniOrNotImageView;