import React from "react"
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import GridItem from "../models/GridItem";
import MiniatureImage from "../models/MiniatureImage";
import ImageView from "./ImageView";
import { styleSheetFactory } from '../themes/themes';
import { useTheme } from 'react-native-themed-styles';

interface AlbumItemProps {
  item: GridItem;
  onPress?: (album: GridItem) => void;
}

const AlbumItem = ({ item, onPress }: AlbumItemProps) => {
  const [styles] = useTheme(themedStyles);

  return (
    <TouchableHighlight onPress={() => onPress && onPress(item)}>
      <View style={styles.container}>
        {/* Album */}
        { 'parentId' in item && 
          <View style={styles.item}>
            <Text style={styles.headerText}>{item.name}</Text>
          </View>
        }

        {/* MiniatureImage */}
        { !('parentId' in item) && 
            <View style={styles.item}>
              <ImageView source={(item as MiniatureImage).filename} height={300}/>
            </View>
        }

      </View>
    </TouchableHighlight>
  )
}

const themedStyles = styleSheetFactory(theme => ({
  container: {
    alignItems: 'center'
  },
  item: {
    width: 300,
    height: 300,
    backgroundColor: theme.colors.highlightPrimary,
    margin: 10,
    flexGrow: 1,
  },
  headerText: {
    position: 'absolute',
    fontWeight: 'bold',
    fontSize: 20,
    bottom: 5,
    left: 5,
    color: theme.colors.text,
  }
}));

export default AlbumItem