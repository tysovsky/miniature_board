import React, { useCallback } from "react";
import { Text, TouchableHighlight, View, StyleSheet } from "react-native";

import { styleSheetFactory } from '../themes/themes';
import { useTheme } from 'react-native-themed-styles';

interface ToolbarProps {
  onBackPressed?: () => void;
}

const Toolbar = ( { onBackPressed }: ToolbarProps) => {
  const [styles] = useTheme(themedStyles);


  return (
    <View style={styles.toolbarContainer}>
      <TouchableHighlight onPress={onBackPressed} style={styles.backButton}>
        <Text style={styles.text}>
          Back
        </Text>
      </TouchableHighlight>
    </View>
  )
}

const themedStyles = styleSheetFactory(theme => ({
  toolbarContainer: {
    backgroundColor: theme.colors.secondary,
    padding: 5,
  },
  backButton: {
    height: 24,
    width: 50,
    textAlign: 'center',
    paddingLeft: 10,
    backgroundColor: theme.colors.primary,
    paddingTop: 3
  },
  text: {
    color: theme.colors.text,
  }
}));

export default Toolbar;