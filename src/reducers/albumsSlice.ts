import { createSlice } from "@reduxjs/toolkit"

import Album from "../models/Album"
import { buildAlbumHierarchy } from "../utils/StateManagement";

export interface AlbumHierarchyItem {
  id: string;
  name: string;
  children: AlbumHierarchyItem[];
}

const initialState: Album[] = [];

export const counterSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    addAlbum: (state, { payload }) => {
      state.push(payload as Album)
    },
    deleteAlbum: (state, { payload }) => {
      state = state.filter(album => album.id !== (payload as Album).id)
    },
    clearAllAlbums: (state) => {
      state.length = 0;
    }
  }
});

export const { addAlbum, deleteAlbum, clearAllAlbums } = counterSlice.actions;

export const selectAlbums = (state: any) => state.albums as typeof initialState;
export const selectAlbumsByParentId = (id: string) => (state: any) => (state.albums as typeof initialState).filter(a => a.parentId == id);
export const selectAlbumById = (id: string) => (state: any) => {
  const albums = (state.albums as typeof initialState).filter(a => a.id == id);
  if(albums.length > 0) return albums[0];

  return undefined;
}; 
export const selectAlbumHierarchy = (state: any) => {
  const albums = state.albums as typeof initialState;

  return buildAlbumHierarchy(albums);
};
export const albumIdToFullPath = (albumId: string, albumHierarachy: AlbumHierarchyItem[]) => {
  const stack: string[] = []

  const traverse = (item: any) => {
    stack.push(item.name)
    
    if(item.id == albumId) return true;

    if(item.children.length == 0){
      stack.pop()
      return false;
    }

    for(const i in item.children){
      const child = item.children[i]

      const result = traverse(child);

      if(result) return true;

    }

    stack.pop();

    return false
  }

  for(const i in albumHierarachy){
    const album = albumHierarachy[i];

    const result = traverse(album)
    if(result) break;
  }

  const albumName = stack.join('/');

  return albumName;
};

export const albumNameToParentAlbumIdAndPath = (albumName: string, albumHierarachy: AlbumHierarchyItem[]) => {
  const albumNames = albumName.split('/');  
  var parentAlbumId = '';
  var albumHierarachyRoot = albumHierarachy;
  var albumFilepath = albumName;
  
  for (let i = 0; i < albumNames.length; i++) {
    const name = albumNames[i];

    var found = false;

    for(const j in albumHierarachyRoot){
      if(albumHierarachyRoot[j].name == name) {
        found = true;
        parentAlbumId = albumHierarachyRoot[j].id;
        albumHierarachyRoot = albumHierarachyRoot[j].children;
        albumFilepath = albumNames.slice(i+1).join('/')
        break;
      }
    }

    if(!found) break;
  }



  return { parentAlbumId: parentAlbumId, albumFilepath: albumFilepath}
};

export default counterSlice.reducer;