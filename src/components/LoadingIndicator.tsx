import React from "react";

import { View, ActivityIndicator } from "react-native";

import { styleSheetFactory } from '../themes/themes';
import { useTheme } from 'react-native-themed-styles';

const LoadingIndicator = () => {
  const [styles] = useTheme(themedStyles);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="small"/>
    </View>
  )
}

const themedStyles = styleSheetFactory(theme => ({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    //opacity: 0.7,
    //backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center"
  }
}));

export default LoadingIndicator;