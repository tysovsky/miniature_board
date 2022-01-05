/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
} from 'react-native';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { styleSheetFactory } from './src/themes/themes';
import { useTheme } from 'react-native-themed-styles';

import SplitView from './src/components/SplitView';
import store, { persistor } from './src/store/store';

import RootModal from './src/components/RootModal';

import { shouldShowSplitView } from './src/utils/Platform';

import PhoneView from './src/views/PhoneView';

const App = () => {
  const [styles] = useTheme(themedStyles);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
          <RootModal />
          <SafeAreaView style={styles.container}>
            { shouldShowSplitView() && <SplitView/>}
            { !shouldShowSplitView() && <PhoneView/> }
          </SafeAreaView>
      </PersistGate>
    </Provider>

  );
};

const themedStyles = styleSheetFactory(theme => ({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1
  }
}));

export default App;
