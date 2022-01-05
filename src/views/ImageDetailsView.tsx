import React from "react";
import { ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AlbumsStackParamsList } from "./AlbumsPage";
import ImageView from "../components/ImageView";

type ImageDetailsViewProps = NativeStackScreenProps<AlbumsStackParamsList, 'Details'>;

const ImageDetailsView = ( { route }: ImageDetailsViewProps) => {
  return (
    <ScrollView>
      <ImageView source={route.params.imageUri} />
    </ScrollView>
  )
}

export default ImageDetailsView;