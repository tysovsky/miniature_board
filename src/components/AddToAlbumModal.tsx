import React, { useCallback, useMemo } from 'react';

import { View, Text, TextInput, StyleSheet, TouchableHighlight } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import uuid from 'react-native-uuid';

import { hideModal, selectActiveCoolMiniOrNotPost } from '../reducers/modalSlice';
import { selectAlbumHierarchy, albumIdToFullPath, albumNameToParentAlbumIdAndPath } from '../reducers/albumsSlice';
import { addMiniatureImage } from '../reducers/miniatureImagesSlice';
import AlbumHierarchyView from './AlbumHierarchyView';

import { makeDirsForAlbums, fetchAndSaveImage } from '../utils/FileSystem';
import MiniatureImage from '../models/MiniatureImage';
import { addNewImage } from '../utils/StateManagement';

import { styleSheetFactory } from '../themes/themes';
import { useTheme } from 'react-native-themed-styles';
import EnhancedPlatform from 'react-native-platforms';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BrowseStackParamsList } from '../views/CoolMiniOrNotPage';

type AddToAlbumModalProps = NativeStackScreenProps<BrowseStackParamsList, 'AddToAlbumModal'>;

const AddToAlbumModal = ( { navigation }: AddToAlbumModalProps) => {
  const dispatch = useDispatch();
  const activeCoolMiniOrNotPost = useSelector(selectActiveCoolMiniOrNotPost);
  const albumHierarachy = useSelector(selectAlbumHierarchy);

  const [styles] = useTheme(themedStyles);

  const onAddNewAlbumSubmitted = useMemo(()=>{
    return (albumName: string) => {
      if(!activeCoolMiniOrNotPost) return;

      makeDirsForAlbums(albumName)
      .then(() => fetchAndSaveImage(activeCoolMiniOrNotPost.id, albumName))
      .then((filename) => {
        addNewImage(filename, albumHierarachy, dispatch);
        dispatch(hideModal());
      })
      .catch((e) => {
        console.error(e);
      })
    }
  }, [activeCoolMiniOrNotPost])

  const onAddToExistingAlbumSubmitted = useMemo(()=> {
    return (albumId: string) => {
      if(!activeCoolMiniOrNotPost) return;

      const albumFilePath = albumIdToFullPath(albumId, albumHierarachy);

      console.log(albumFilePath)

      fetchAndSaveImage(activeCoolMiniOrNotPost.id, albumFilePath)
      .then((filename) => {
        const miniatureImage: MiniatureImage = {
          id: uuid.v4().toString(),
          albumId: albumId,
          name: '',
          filename: filename
        }

        dispatch(addMiniatureImage(miniatureImage))
        dispatch(hideModal())
      })
    }
  }, [activeCoolMiniOrNotPost, albumHierarachy])

  const onCancelPressed = useCallback(() => {
    if (EnhancedPlatform.isMacOS){
      dispatch(hideModal());
    }
    else{
      navigation.goBack();
    }
  }, [])

  return (
    <View style={styles.container}>
      { EnhancedPlatform.isMacOS && <Text style={styles.header}>Add to Album</Text> }
      
      <View style={styles.newAlbumContainer}>
        <Text style={styles.newAlbumText}>New Album</Text>
        <TextInput
          style={styles.newAlbumInput}
          onSubmitEditing={ (e)=>onAddNewAlbumSubmitted(e.nativeEvent.text) }
          />
      </View>
      
      <View style={styles.existingAlbumContainer}>
        <Text style={styles.existingAlbumText}>Existing Album</Text>
        <AlbumHierarchyView onAlbumPresses={onAddToExistingAlbumSubmitted} />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableHighlight onPress={ onCancelPressed } style={styles.buttonPressable}>
          <Text style={styles.text}>Cancel</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}

const themedStyles = styleSheetFactory(theme => ({
  container: {
    padding: 10,
    backgroundColor: theme.colors.highlightPrimary,
    flex: 1,
    borderWidth: 4,
    borderColor: theme.colors.highlightSecondary,
    borderRadius: 4
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  newAlbumContainer: {
    marginTop: 5,
    paddingTop: 5,
    borderTopColor: theme.colors.highlightSecondary,
    borderTopWidth: 1,
  },
  newAlbumText: {
    fontSize: 15,
    color: theme.colors.text,
  },
  newAlbumInput: {
    backgroundColor: theme.colors.highlightSecondary,
    height: 30,
    fontSize: 23,
    marginTop: 5
  },
  existingAlbumContainer: {
    marginTop: 10,
    paddingTop: 5,
    borderTopColor: theme.colors.highlightSecondary,
    borderTopWidth: 1
  },
  existingAlbumText: {
    fontSize: 15,
    marginBottom: 10,
    color: theme.colors.text,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: theme.colors.highlightSecondary,
  },
  buttonPressable: {
    width: 80,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: theme.colors.text,
  }
}));

export default AddToAlbumModal;