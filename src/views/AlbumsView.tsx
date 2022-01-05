import React, { useEffect, useMemo, useState } from "react";

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { View } from "react-native";

import { useSelector, shallowEqual } from "react-redux";

import { selectAlbumsByParentId, selectAlbumById } from "../reducers/albumsSlice";
import { selectMiniatureImagesByAlbumId } from "../reducers/miniatureImagesSlice";

import { styleSheetFactory } from '../themes/themes';
import { useTheme } from 'react-native-themed-styles';

import AlbumsGrid from "../components/AlbumsGrid";
import Album from "../models/Album";

import GridItem from "../models/GridItem";
import MiniatureImage from "../models/MiniatureImage";
import { AlbumsStackParamsList } from "./AlbumsPage";

type AlbumsViewProps = NativeStackScreenProps<AlbumsStackParamsList, 'Albums'>;

const AlbumsView = ( {route, navigation }: AlbumsViewProps) => {
  const [styles] = useTheme(themedStyles);

  const { activeAlbum } = route.params;

  const albums = useSelector(selectAlbumsByParentId(activeAlbum ? activeAlbum.id : ''), shallowEqual);
  const miniatureImages = useSelector(selectMiniatureImagesByAlbumId(activeAlbum?.id || ''), shallowEqual)

  const [gridItems, setGridItems] = useState<GridItem[]>([]);

  useEffect(()=> {
    const items = (albums as GridItem[]).concat((miniatureImages as GridItem[])) as GridItem[];
    setGridItems(items);
  }, [albums, miniatureImages]);


  const onAlbumItemPressed = useMemo(() => {
    return (item: Album | MiniatureImage) => {
      if ('filename' in item) {
        navigation.push('Details', {
          imageUri: item.filename
        });
      } else {
        navigation.push('Albums', {
          activeAlbum: item
        });
      }
    }
  }, [activeAlbum]);

  return (
    <View style={styles.container}>      
      <AlbumsGrid items={gridItems} onItemPressed={onAlbumItemPressed}/>
    </View>
  )
}

const themedStyles = styleSheetFactory(theme => ({
  container: {
    marginBottom: 80,
    height: '100%'
  },
  actionBar: {
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
    marginLeft: 15,
    color: theme.colors.text,
  }
}));

export default AlbumsView