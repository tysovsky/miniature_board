import React from "react";

import { TextInput } from "react-native";

import { styleSheetFactory } from '../themes/themes';
import { useTheme } from 'react-native-themed-styles';

interface SearchBarProps {
  placeholder?: string;
  onSubmit?: (text: string) => void;
}

const SearchBar = ( {placeholder, onSubmit}: SearchBarProps ) => {
  const [styles] = useTheme(themedStyles);

  return (
    <TextInput
      style={styles.searchBar}
      placeholder={placeholder}
      onSubmitEditing={(event) => {onSubmit && onSubmit(event.nativeEvent.text)}}
  />
  )
}

const themedStyles = styleSheetFactory(theme => ({
  searchBar: {
    height: 30,
    marginHorizontal: theme.dimension.margin.default,
    backgroundColor: theme.colors.highlightPrimary,
    fontSize: 20,
    borderWidth: 3,
    borderColor: theme.colors.highlightSecondary,
    color: theme.colors.text,
    marginBottom: 10
  }
}));

export default SearchBar;