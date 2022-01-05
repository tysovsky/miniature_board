import React from "react";
import { useColorScheme } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { navigationRef } from "../utils/RootNavigator";
import CoolMiniOrNotView from "./CoolMiniOrNotView";
import SettingsPage from "./SettingsPage";
import AlbumsPage from "./AlbumsPage";
import Ionicons from 'react-native-vector-icons/Ionicons';
import CoolMiniOrNotPage from "./CoolMiniOrNotPage";

const Tab = createBottomTabNavigator<TabStackParamList>();

export type TabStackParamList = {
  AlbumsPage: undefined;
  Browse: undefined;
  Settings: undefined;
};

const PhoneView = () =>{
  const scheme = useColorScheme();
  return (
    <NavigationContainer ref={navigationRef} theme={scheme == 'dark' ? DarkTheme : DefaultTheme}>
      <Tab.Navigator initialRouteName="AlbumsPage"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'AlbumsPage') {
              iconName = focused ? 'albums' : 'albums-outline';
            }
            else if (route.name === 'Browse') {
              iconName = focused ? 'globe' : 'globe-outline';
            }
            else if (route.name === 'Settings') {
              iconName = focused ? 'cog' : 'cog-outline';
            }
            else{
              iconName = focused ? 'add' : 'add';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          }
        })}>
        <Tab.Screen
          name ='AlbumsPage'
          component={AlbumsPage}
          options={{headerShown: false, tabBarLabel: 'Albums'}}
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
  );
}

export default PhoneView;