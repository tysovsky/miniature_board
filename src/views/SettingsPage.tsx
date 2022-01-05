import React, { useMemo } from "react";
import { SettingsScreen } from "react-native-settings-screen"

import { Text, TouchableHighlight, View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import { clearAllMiniatureImages } from "../reducers/miniatureImagesSlice";
import { clearAllAlbums } from "../reducers/albumsSlice";

import { styleSheetFactory } from '../themes/themes';
import { useTheme } from 'react-native-themed-styles';

const SettingsPage = () => {
  const dispatch = useDispatch();

  const [styles] = useTheme(themedStyles);

  const onClearAllStatePressed = useMemo(()=>{
    return () => {
      console.log('Clearing...')
      dispatch(clearAllMiniatureImages());
      dispatch(clearAllAlbums());
    }
  }, []);

  return (
    <View style={styles.container}>
      <TouchableHighlight style={styles.button} onPress={onClearAllStatePressed}>
        <Text style={styles.buttonText}> Clear All Persisted State</Text>
      </TouchableHighlight>
    </View>
  )
}

const themedStyles = styleSheetFactory(theme => ({
  container: {
    padding: 10
  },
  button: {
    backgroundColor: theme.colors.highlightPrimary,
    width: 300,
    height: 50
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 10
  }
}));

export default SettingsPage;