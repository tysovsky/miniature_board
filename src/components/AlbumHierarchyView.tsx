import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";

import { selectAlbumHierarchy } from "../reducers/albumsSlice";
import { ScrollView } from 'react-native';
import TreeView from 'react-native-final-tree-view';

const getIndicator = (isExpanded: boolean, hasChildrenNodes: boolean) => {
  if (!hasChildrenNodes) {
    return ''
  } else if (isExpanded) {
    return '-'
  } else {
    return '>'
  }
}

interface AlbumHierarchyViewProps {
  onAlbumPresses?: (albumId: string) => void;
}

const AlbumHierarchyView = ({ onAlbumPresses }: AlbumHierarchyViewProps) => {
  const albumHierarachy = useSelector(selectAlbumHierarchy);

  return (
    <ScrollView>
      <TreeView
        data={albumHierarachy}
        initialExpanded={true}
        renderNode={({ node, level, isExpanded, hasChildrenNodes} ) => {
          return (
            <View>
              <Text style={ { marginLeft: 10 * level} }>
                {getIndicator(isExpanded, hasChildrenNodes)} {node.name}
              </Text>
            </View>
          )
        }}
        onNodePress={({ node, level }) => {
          onAlbumPresses && onAlbumPresses(node.id)
          return false;
        }}
      />
    </ScrollView>

  )
}

export default AlbumHierarchyView;