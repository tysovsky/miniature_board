import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { EnhancedPlatform } from "react-native-platforms";
import CoolMiniOrNotView from "./CoolMiniOrNotView";
import AddToAlbumModal from "../components/AddToAlbumModal";

export type BrowseStackParamsList = {
  CoolMiniOrNotView: undefined;
  AddToAlbumModal: undefined;
};

const BrowsePage = () => {
  const Stack = EnhancedPlatform.isMacOS ? createStackNavigator<BrowseStackParamsList>() : createNativeStackNavigator<BrowseStackParamsList>();
  
  return (
    <Stack.Navigator initialRouteName="CoolMiniOrNotView">
      <Stack.Group>
        <Stack.Screen
          name ='CoolMiniOrNotView'
          component={CoolMiniOrNotView}
          options={{title: 'Browse'}}
        />
      </Stack.Group>

      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name = 'AddToAlbumModal'
          component={AddToAlbumModal}
          options={{title: 'Add To Album'}}
        />
        </Stack.Group>
    </Stack.Navigator>
  )
};

export default BrowsePage;