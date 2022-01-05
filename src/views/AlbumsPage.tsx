import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { EnhancedPlatform } from "react-native-platforms";
import Album from "../models/Album";
import AlbumsView from "./AlbumsView";
import ImageDetailsView from "./ImageDetailsView";
import { useDispatch } from "react-redux";
import { clearAllAlbums } from "../reducers/albumsSlice";
import { clearAllMiniatureImages } from "../reducers/miniatureImagesSlice";

export type AlbumsStackParamsList = {
  Albums: { activeAlbum: Album | undefined };
  Details: { imageUri: string };
};

const AlbumsPage = () => {
  const Stack = EnhancedPlatform.isMacOS ? createStackNavigator<AlbumsStackParamsList>() : createNativeStackNavigator<AlbumsStackParamsList>();


  return (
    <Stack.Navigator initialRouteName="Albums">
      <Stack.Screen
        name ='Albums'
        component={AlbumsView}
        initialParams={{ activeAlbum: undefined }}
        options={({ route }) => ({ title: route.params.activeAlbum?.name || 'Albums'})}
      />
      <Stack.Screen
        name = 'Details'
        component={ImageDetailsView}
      />
    </Stack.Navigator>
  )
};

export default AlbumsPage;