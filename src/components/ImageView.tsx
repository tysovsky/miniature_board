import React, { useEffect, useState } from 'react';

import {
  View,
  LayoutChangeEvent
} from 'react-native';

import AutoHeightImage from 'react-native-auto-height-image';
import { readImage } from '../utils/FileSystem';

import LoadingIndicator from './LoadingIndicator';

interface ImageViewProps {
  source: string;
  height?: number;
  onLoadEnd?: () => void;
}

const ImageView = ({ source, height , onLoadEnd}: ImageViewProps) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [imageViewLoading, setImageViewLoading] = useState(true);

  const [imageUri, setUri] = useState<string>('');

  useEffect(()=>{
    let unmounted = false;
    if (!unmounted){
      if(source.startsWith('http')){
        setUri(source);
        setIsLoading(false);
        return;
      } 
  
      readImage(source)
      .then((base64Image) => {
        if(!unmounted)
          setUri(`data:image/png;base64,${base64Image}`)
      })
      .catch(e => {})
      .finally(() => {
        if(!unmounted)
          setIsLoading(false)
      })
    }
    return () => { unmounted = true };
  },
  [source])

  const onViewLayoutChange = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  }

  return (
    <View onLayout={onViewLayoutChange}>
      {!isLoading && <AutoHeightImage
        source={{ uri: imageUri }}
        width={ containerWidth }
        maxHeight={ height || Infinity }
        onLoadEnd={() => { 
          setImageViewLoading(false)}
        }
        resizeMode='cover'
      />
      }
      {imageViewLoading || isLoading && <LoadingIndicator/>}
    </View>
  )
}


export default ImageView;