import React from "react";

import { FlatGrid } from 'react-native-super-grid';

import Album from "../models/Album";
import AlbumItem from "../components/AlbumItem";
import GridItem from "../models/GridItem";
import { styleSheetFactory } from "../themes/themes";
import { useTheme } from "react-native-themed-styles";

interface AlbumsGridProps {
  items: GridItem[];
  onItemPressed?: (item: Album) => void;
}

const AlbumsGrid = ({ items, onItemPressed }: AlbumsGridProps) => {
  const [styles] = useTheme(themedStyles);

  return (
    <FlatGrid
      itemDimension={300}
      data={items}
      renderItem={({ item }) => <AlbumItem item={item} onPress={onItemPressed}/>
    }
    />
  )
};

const themedStyles = styleSheetFactory(theme => ({
  container: {
    
  }
}));

export default AlbumsGrid;