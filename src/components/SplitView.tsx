import React, { useMemo, useRef } from "react";

import { View, useColorScheme } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { readAllImages } from "../utils/FileSystem";
import { styleSheetFactory } from '../themes/themes';
import { useTheme } from 'react-native-themed-styles';
import useInterval from '../hooks/useInterval';
import { selectAlbumHierarchy, selectAlbums } from "../reducers/albumsSlice";
import { deleteMiniatureImage, selectMiniatureByFilename, selectMiniatureImages } from "../reducers/miniatureImagesSlice";
import Album from "../models/Album";
import { addNewImage, buildAlbumHierarchy } from "../utils/StateManagement";
import store from "../store/store";
import { 
  NavigationContainer,
  DefaultTheme,
  DarkTheme, 
} from "@react-navigation/native";
import CoolMiniOrNotView from "../views/CoolMiniOrNotView";
import SettingsPage from "../views/SettingsPage";
import NavigationView from "../views/NavigationView";
import AlbumsPage from "../views/AlbumsPage";
import { navigationRef } from '../utils/RootNavigator';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CoolMiniOrNotPage from "../views/CoolMiniOrNotPage";

export type RootStackParamList = {
  AlbumsPage: undefined;
  Browse: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const SplitView = () => {
  const [styles] = useTheme(themedStyles);
  const scheme = useColorScheme();

  const albumHierarachy = useSelector(selectAlbumHierarchy);
  const albumHierarachyRef = useRef(albumHierarachy);
  const albums = useSelector(selectAlbums);

  const miniatureImages =  useSelector(selectMiniatureImages);

  const dispatch = useDispatch();

  const fileReconciliator = useMemo(()=>{
    return async () => {
      const stateImages = miniatureImages.map(i => i.filename);
      const localImages = await readAllImages();

      // local images - state images
      const newImages = localImages.filter((i) => !stateImages.includes(i));

      var a = ([] as Album[]).concat(albums);

      for(let i = 0; i < newImages.length; i++) {
        const newImage = newImages[i];
        const hierarchy = buildAlbumHierarchy(a);
        const newAlbums = await addNewImage(newImage, hierarchy, dispatch);

        a = a.concat(newAlbums)
      }

      const deletedImages = stateImages.filter(i => !localImages.includes(i));
      for (let i = 0; i < deletedImages.length; i++){
        const deleteImageFilename = deletedImages[i];
        const deletedImage = selectMiniatureByFilename(deleteImageFilename)(store.getState())
        dispatch(deleteMiniatureImage(deletedImage))
      }
    }
  }, [albumHierarachy, albumHierarachyRef, dispatch])

  useInterval(fileReconciliator, 1 * 15000, true);

  return (
      <View style={styles.root}>
        <View style={styles.masterView}>
          <NavigationView/>
        </View>
        <NavigationContainer ref={navigationRef} theme={scheme == 'dark' ? DarkTheme : DefaultTheme}>
          <Tab.Navigator initialRouteName="AlbumsPage" screenOptions={{
            tabBarStyle: { height: 0 },
          }}>
            <Tab.Screen
              name ='AlbumsPage'
              component={AlbumsPage}
              options={{headerShown: false}}
            />
            <Tab.Screen
              name = 'Browse'
              component={CoolMiniOrNotPage}
              options={{headerShown: false}}
            />
            <Tab.Screen
              name = 'Settings'
              component={SettingsPage}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </View>

  )
}

const themedStyles = styleSheetFactory(theme => ({
  root: {
    flex: 1,
    flexDirection: 'row',
  },
  masterView: {
    flex: 1, 
    maxWidth: 200,
    height: '100%'
  },
  detailView: {
    flex: 1,
    overflow: 'hidden',
  },

}));

export default SplitView;