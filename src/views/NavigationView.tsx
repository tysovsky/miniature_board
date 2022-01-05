import React, { useCallback, useMemo } from "react";

import { FlatList, Text, View } from "react-native";

import MenuItem from "../models/MenuItem";
import NavigationItem from "../components/NavigationItem";

import { styleSheetFactory } from '../themes/themes';
import { useTheme } from 'react-native-themed-styles';

import { navigate } from '../utils/RootNavigator';

import { useDispatch } from "react-redux";
import { setActiveNavigationItemId } from "../reducers/settingsSlice";


const menuItems: MenuItem[] = [
  {
    id: 'albums',
    title: 'Albums'
  },
  {
    id: 'cmon',
    title: 'Browse'
  },
  {
    id: 'settings',
    title: 'Settings'
  }
]

const NavigationView = () => {
  const [styles] = useTheme(themedStyles);
  const dispatch = useDispatch();

  const onMenuItemPressed = useCallback((item: MenuItem)=>{
    dispatch(setActiveNavigationItemId(item.id))
    if(item.id == 'cmon') navigate('Browse', undefined)
    else if(item.id == 'albums') navigate('AlbumsPage', { activeAlbum: undefined});
    else if(item.id == 'settings') navigate('Settings', undefined);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>MiniatureBoard</Text>
      <FlatList
        style={styles.menuContainer}
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => {
          return <NavigationItem item={item} onPress={onMenuItemPressed}/>
        }}
      />
    </View>

  )
}

const themedStyles = styleSheetFactory(theme => ({
  container: {
    backgroundColor: theme.colors.highlightPrimary,
    height: '100%'
  },
  header: {
    fontSize: 25,
    fontWeight: 'normal',
    padding: theme.dimension.padding.default,
    paddingBottom: 0,
    color: theme.colors.text,
  },
  menuContainer: {
    //margin: theme.dimension.margin.default
  },
}));

export default NavigationView;