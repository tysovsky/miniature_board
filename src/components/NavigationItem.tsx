import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import MenuItem from "../models/MenuItem";
import { styleSheetFactory } from '../themes/themes';
import { useTheme } from 'react-native-themed-styles';
import { selectactiveNavigationItemId } from "../reducers/settingsSlice";
import { useSelector } from "react-redux";
import Ionicons from 'react-native-vector-icons/Ionicons';

const getIconName = (item: MenuItem, active: boolean) =>{
  if(item.id == 'cmon') return active ? 'globe-outline' : 'globe';
  if(item.id == 'albums') return active ? 'albums-outline' : 'albums';
  if(item.id == 'settings') return active ? 'cog-outline' : 'cog';

  return 'add'
}

interface NavigationItemProps {
  item: MenuItem;
  onPress?: (item: MenuItem) => void;
}

const NavigationItem  = ( { item, onPress }: NavigationItemProps) => {
  const [styles] = useTheme(themedStyles);

  const activeNavigationItemId = useSelector(selectactiveNavigationItemId);
  const activeItem = activeNavigationItemId == item.id;

  return (
    <TouchableHighlight onPress={() => onPress && onPress(item)}>
      <View style={activeItem ? styles.selectedMenuItemContainer : styles.menuItemContainer}>
        <Ionicons name={getIconName(item, activeItem)} size={20} style={styles.icon} color={'white'}/>
        <Text style={styles.menuItemText}>{item.title}</Text>
      </View>
    </TouchableHighlight>
  )
}

const themedStyles = styleSheetFactory(theme => ({
  menuItemContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.dimension.padding.default
  },
  selectedMenuItemContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.highlightSecondary,
    paddingHorizontal: theme.dimension.padding.default
  },
  menuItemText: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 3,
    color: theme.colors.text,
  },
  icon: {
    marginTop: 5
  }
}));

export default NavigationItem;