import { createSlice } from "@reduxjs/toolkit"
import MiniatureImage from "../models/MiniatureImage"

const initialState: MiniatureImage[] = [];

export const miniatureImagesSlice = createSlice({
  name: 'miniatureImages',
  initialState,
  reducers: {
    addMiniatureImage: (state, { payload }) => {
      state.push(payload as MiniatureImage)
    },
    deleteMiniatureImage: (state, { payload }) => {
      // const pos = state.map(mi => mi.id).indexOf((payload as MiniatureImage).id);
      // if(pos >= 0)
      //   delete state[pos]
      return state.filter(mi => mi.id != (payload as MiniatureImage).id)
    },
    clearAllMiniatureImages: (state) => {
      state.length = 0;
    }
  }
});

export const { addMiniatureImage, deleteMiniatureImage, clearAllMiniatureImages } = miniatureImagesSlice.actions;

export const selectMiniatureImages = (state: any) => state.miniatureImages as typeof initialState;
export const selectMiniatureImagesByAlbumId = (id: string) => (state: any) => {
  return (state.miniatureImages as typeof initialState).filter(mi => mi && mi.albumId == id);
}

export const selectMiniatureByFilename = (filename: string) => (state: any) => {
  const mi = (state.miniatureImages as typeof initialState).filter(mi =>  mi && mi.filename == filename);

  if(mi.length == 0) return undefined;
  return mi[0];
}



export default miniatureImagesSlice.reducer;