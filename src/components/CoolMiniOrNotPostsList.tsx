import React, { useState } from 'react';

import { FlatList } from 'react-native';
import { StyleSheet } from 'react-native';

import CoolMiniOrNotPostContainer from './CoolMiniOrNotPostContainer';
import CoolMiniOrNotPost from '../models/CoolMiniOrNotPost';

interface CoolMiniOrNotPostsListProps {
  posts: CoolMiniOrNotPost[];
  onAddToAlbumPress?: (post: CoolMiniOrNotPost) => void;
  onEndReached?: () => void;
}

const CoolMiniOrNotPostsList = ({ posts, onAddToAlbumPress, onEndReached }: CoolMiniOrNotPostsListProps) => {
  const [layout, setLayout] = useState({
    width: 0,
    height: 0,
  });

  return (
    <FlatList
        style={styles.container}
        onLayout={(e) => setLayout(e.nativeEvent.layout)}
        data={posts}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => {
          return <CoolMiniOrNotPostContainer post={item} width={layout.width} onAddToAlbumPress={onAddToAlbumPress}/>
        }}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  }
});

export default CoolMiniOrNotPostsList;