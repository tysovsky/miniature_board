import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '../components/SplitView';

export const navigationRef = createNavigationContainerRef<RootStackParamList>()

export const navigate = (name, params) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}