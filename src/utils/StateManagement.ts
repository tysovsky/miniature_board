import { Dispatch } from "react";
import uuid from 'react-native-uuid';
import Album from "../models/Album";
import MiniatureImage from "../models/MiniatureImage";
import { albumNameToParentAlbumIdAndPath, addAlbum, AlbumHierarchyItem } from "../reducers/albumsSlice";
import { addMiniatureImage } from "../reducers/miniatureImagesSlice";
import { filenameToAlbumName } from "./FileSystem";


export const addNewImage = async (filename: string, albumHierarachy: AlbumHierarchyItem[], dispatch: Dispatch<any>) => {
  const albumName = filenameToAlbumName(filename);
  
  const { parentAlbumId, albumFilepath } = albumNameToParentAlbumIdAndPath(albumName, albumHierarachy);

  const albums = albumFilepath.split('/');

  const newAlbums: Album[] = [];

  var lastAlbumId = parentAlbumId;

  if(albumFilepath.length > 0) {
    for(const i in albums){
      const album: Album = {
        id: uuid.v4().toString(),
        name: albums[i],
        parentId: lastAlbumId
      }

      lastAlbumId = album.id;
      newAlbums.push(album);
      dispatch(addAlbum(album));
    }
  }

  const miniatureImage: MiniatureImage = {
    id: uuid.v4().toString(),
    albumId: lastAlbumId,
    name: '',
    filename: filename
  }

  dispatch(addMiniatureImage(miniatureImage));

  return newAlbums;
}

export const deleteImage = (filename: string, miniatureImages: MiniatureImage[]) => {

}

export const buildAlbumHierarchy = (albums: Album[]) => {
  const getChildren = (album: Album): any => {
    const children =  albums.filter((a) => a.parentId == album.id)

    if(children.length == 0) return [];

    return children.map((a) => build(a));
  };

  const build = (album: Album) => {
    const children = getChildren(album);

    return {
      id: album.id,
      name: album.name,
      children: children
    }
  };

  const hierarchy = albums.filter((a) => a.parentId == '').map((a) => build(a));

  return hierarchy;
}