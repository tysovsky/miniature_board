import { EnhancedPlatform } from 'react-native-platforms'
import { Platform, PlatformIOSStatic } from 'react-native';

export const shouldShowSplitView = () => {
  if (EnhancedPlatform.isMacOS) return true;

  if (EnhancedPlatform.isIos){
    const platformIOS = Platform as PlatformIOSStatic;
    return platformIOS.isPad
  }

  return false;
}